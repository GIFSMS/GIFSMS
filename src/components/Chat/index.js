import React, { useState, useEffect, useRef } from 'react';

const superagent = require('superagent');
const io = require('socket.io-client');
require('dotenv').config();
// const HOST = process.env.REACT_APP_HOST || 'http://localhost:3001';
const HOST = process.env.REACT_APP_HOSTT || "http://localhost:3001"
const socket = io.connect(`${HOST}/gifs`);

let Chat = ({ user, authPro }) => {

    const [state, setState] = useState({ message: '', user: '' });
    const [chat, setChat] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState('');
    const [gifArray, setGifArray] = useState([]);
    const [activeRoom, setActiveRoom] = useState('Main Room');
    const [activeSideNav, setActiveSideNav] = useState('chat');
    const [toggleProfile, setToggleProfile] = useState(false);
    const [profile, setProfile] = useState({ email: "", favorites: [], friends: [], id: 0 })

    const onChang = (e) => {
        setState({ ...state, message: e.target.value })
    }

    useEffect(() => {
        //Notifies when user joines room
        socket.on('user joined', payload => {
            console.log(payload);
            //Sets chat notification of user joining room
            setChat(arr => [...arr, { type: "notification", message: `User ${payload.user} has joined the room`, user: payload.user }])
        });

        //Once User logs in, updates state for current user
        setState({ ...state, user });

        //Receives list of participants from socket server
        socket.on('get participants', payload => {
            setParticipants(payload.participants)
        })

        //Receives list of rooms
        socket.on('get rooms', payload => {
            setRooms(payload.rooms);
        })

        //User has sent a message
        socket.on('message', payload => {
            //Updates the chat message list
            setChat(arr => [...arr, { message: payload.message, user: payload.user }])
        });


        //Notifies when user leaves a room
        socket.on('user disconnected', payload => {
            setChat(arr => [...arr, { type: "notification", message: `User ${payload.user} has left the room`, user: payload.user }])
        })

        socket.on('profile', payload => {
            console.log("PROFILE EMMIT: ", payload)
            setProfile(payload)

        })

        socket.on('updatecheck', payload => {
            console.log("AFTER UPDATE TO DB: ", payload)
        })

        // eslint-disable-next-line
    }, [])

    // Have user join main room after login
    // load trending gifs to the gifArray
    useEffect(() => {
        if (state.user) {
            let rez = []
            let url = `https://api.giphy.com/v1/gifs/trending?limit=5`
            superagent.get(url)
                .query({ api_key: `${process.env.REACT_APP_GIF_API}` })
                .then(function (results) {
                    let base = results.body.data
                    base.forEach(el => {
                        rez.push({ image: el.images.fixed_width.url, id: el.id, title: el.title })
                    })

                    setGifArray(arr => [...rez])
                })
                .catch(function (error) {
                    console.log('Womp Womp', error);
                    // res.status(500).send('we messed up');
                })
            socket.emit('join', { user: state.user, room: "Main Room" })
            // socket.emit('logingif', {user: authPro.email})
            // console.log("AUTH0?: ", authPro.email)
        }
    }, [state.user])

    useEffect(() => {
        socket.emit('logingif', { user: authPro.email })
    }, [authPro])



    // method to fetch Giphy API on chat input
    const Data = { set: [] };
    Data.handleAPICall = async (req, res) => {
        const url = `https://api.giphy.com/v1/gifs/search?q=${state.message}&limit=5`;
        superagent.get(url)
            .query({ api_key: `${process.env.REACT_APP_GIF_API}` })
            .then(function (superagentResults) {
                Data.results = superagentResults
                let workable = Data.results.body.data
                workable.forEach(el => {
                    Data.set.push({ image: el.images.fixed_width.url, id: el.id, title: el.title })
                })
                setGifArray(arr => [...Data.set])
                Data.set = []
            })
            .catch(function (error) {
                console.log('Womp Womp', error);
            })
    }

    //"translate" API call to Giphy
    const gamble = async (req, res) => {
        const url = `https://api.giphy.com/v1/gifs/translate?s=${state.message}`;
        superagent.get(url)
            .query({ api_key: `${process.env.REACT_APP_GIF_API}` })
            .then(function (superagentResults) {
                let workable = superagentResults.body.data;
                console.log(superagentResults)
                socket.emit('message', { message: workable.images.fixed_width.url, user: state.user, room: activeRoom })
            })
            .catch(function (error) {
                console.log('Womp Womp');
                console.log(error);
                // res.status(500).send('we messed up');
            })
    }


    //method for images to send on click
    const clickMe = (e) => {
        e.preventDefault();
        socket.emit('message', { message: { image: e.target.src, id: e.target.id, title: e.target.alt }, user: state.user, room: activeRoom })
        setState({ ...state, message: '' })
    }

    //function to render the gifs from api call
    const gifWindow = (data) => {
        return data.map((el, index) => (
            <div className="gif-prev" key={el.id + index}>
                <img src={el.image} alt={el.title} id={el.id} key={el.id} onClick={(e) => clickMe(e)} />
            </div>

        ))
    }

    //set ref to the end of the chat window
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    //watch for changes to chat
    useEffect(() => {
        scrollToBottom()
    }, [chat]);

    const hasFavorite = (id) => {
        let bool = profile.favorites.reduce((acc, cur) => {
            if (cur.id === id) {
                acc = true;
                return acc;
            }
            return acc;
        }, false)

        return bool;
    }

    //Displays the chat messages
    const chatWindow = () => {
        return chat.map(({ message, user, type }, index) => (
            type === 'notification' ?
                <>
                    <div key={index} className="notification">
                        <h4>
                            {message}
                        </h4>
                    </div>
                    <div ref={messagesEndRef} />
                </>
                :
                <>
                    <div key={index} className={user === state.user ? "my-message" : "message"}>
                        <div className="message-content">
                            <img alt={message.title} src={message.image} id={message.id} />
                            <h2>{user}</h2>
                            <div className="message-favorite" onClick={() => addFav(message.title, message.image, message.id)}><i className={hasFavorite(message.id) ? "fas fa-heart" : "far fa-heart"}></i></div>
                        </div>
                    </div>
                    <div ref={messagesEndRef} />
                </>
        ))
    }

    //Displays the participants
    const chatParticipants = () => {
        return activeRoom ? participants.map((user, index) => (
            <div key={index} className="participant">
                <h3>
                    {user}
                </h3>
                <span onClick={() => setToggleProfile(!toggleProfile)}><i className="fas fa-user"></i></span>
            </div>
        ))

            : ""
    }

    //Displays the chat rooms
    const chatRooms = () => {
        return rooms.map((room, index) => (
            <div key={index} room={room} className="room">
                <h3>
                    {room}
                </h3>
                {room === activeRoom ? <span><i className="fas fa-user-check"></i></span> : <span><i className="fas fa-door-open" onClick={switchRoom}></i></span>}
            </div>
        ))
    }

    const switchRoom = (e) => {
        let selectedRoom = e.target.parentElement.parentElement.getAttribute('room');
        if (activeRoom !== selectedRoom) {
            if (activeRoom) {
                socket.emit('leave', { user: state.user, room: activeRoom });
            }
            setChat([]);
            socket.emit('join', { user: state.user, room: selectedRoom });
            setActiveRoom(selectedRoom);
        }
    }

    //Users should be able to create own public rooms or private rooms to specific users
    const joinRoom = () => {
        if (newRoom) {
            setChat([]);
            socket.emit('join', { user: state.user, room: newRoom });
            setActiveRoom(newRoom);
        }
        setNewRoom('');
    }

    //UPDATING THE MAIN PROFILE
    // const updateProfile = (data) => {
    //     let update = {...profile, ...data}
    //     setProfile(update)
    //     socket.emit('update', update)
    // }

    //I want to press enter to submit
    const ent = (e) => {
        if (e.key === "Enter") { Data.handleAPICall() }
    }

    //Create room with enter key
    const newRoomEnter = e => {
        if (e.key === "Enter") joinRoom();
    }

    const addFav = (title, image, id) => {
        // check if it already favorited
        let duplicate = profile.favorites.reduce((acc, curr) => {
            if (curr.id === id) {acc = true}
            return acc
        }, false);

        if (!duplicate){
            let update = [...profile.favorites, { image, id, title }]
            setProfile({ ...profile, favorites: update })
            console.log("ADDED FAV: ", update, profile)
            socket.emit('update', { ...profile, favorites: update })
        }else{
            let update = profile.favorites.filter(el => el.id!==id)
            setProfile( {...profile, favorites: update})
            console.log("REMOVED FAV: ", update, profile)
            socket.emit('update', {...profile, favorites: update})
        }
    }

    const favoriteArray = () => {
        return profile.favorites.map((el, index) => (
            <li className="gif-prev" key={el.id + index}>
                <img src={el.image} alt={el.title} id={el.id} key={el.id} onClick={(e) => clickMe(e)} />
                <div className="message-favorite" onClick={() => addFav(el.title, el.image, el.id)}><i className={hasFavorite(el.id) ? "fas fa-heart" : "far fa-heart"}></i></div>
            </li>

        ))
    }


    return (
        <>
            <div className="chat-container">
                <div className="side-nav">
                    <div className="side-bar">
                        <div>
                            <i className={activeSideNav === 'chat' ? `fas fa-comments active` : `fas fa-comments`} onClick={() => setActiveSideNav('chat')}></i>
                            <p>Chat</p>
                        </div>
                        <div>
                            <i className={activeSideNav === 'users' ? `fas fa-users active` : `fas fa-users`} onClick={() => setActiveSideNav('users')}></i>
                            <p>Users</p>
                        </div>
                    </div>

                    <div className="side-nav-content">
                        {activeSideNav === 'chat' ?
                            (<>
                                <div className="rooms">
                                    <div className="create-room">
                                        <input type="text" placeholder="Create Room" value={newRoom} onChange={e => setNewRoom(e.target.value)} onKeyUp={newRoomEnter} />
                                        {/* <button onClick={joinRoom}><i class="fas fa-plus-square"></i></button> */}
                                    </div>
                                    {/* <h2>Chat Rooms</h2> */}
                                    {
                                        rooms && (
                                            <>
                                                {chatRooms()}
                                            </>
                                        )
                                    }


                                </div>
                                <div className="participants">
                                    <h2>Room Participants</h2>
                                    {
                                        participants && (
                                            <>
                                                {chatParticipants()}
                                            </>
                                        )
                                    }
                                </div>
                            </>

                            ) :

                            (
                                <>
                                    <div className="allParticipants">
                                        <h2>All Participants</h2>
                                        {
                                            participants && (
                                                <>
                                                    {chatParticipants()}
                                                </>
                                            )
                                        }
                                    </div>
                                </>
                            )
                        }


                    </div>

                </div>
                <div className="chat">
                    <h2>Chat</h2>
                    <div className="chatArea">
                        <div className="chatWindow">
                            {chatWindow()}
                        </div>

                        <div className="search-gifs">
                            <div className="search">
                                <label htmlFor="">
                                    <input placeholder="Search Giphs" type="text" onChange={(e) => onChang(e)} onKeyDown={(e) => ent(e)} value={state.message} />
                                    <i className="fas fa-search" onClick={Data.handleAPICall}></i>
                                </label>


                                <button onClick={gamble}>Random Giph!</button>
                                {/* <button onClick={updateProfile(gifArray[0])}>Add to fav</button> */}
                            </div>

                            <div className='gifTown'>
                                {gifWindow(gifArray)}
                            </div>
                        </div>


                    </div>
                </div>

                <div className={toggleProfile ? "profile open" : "profile"}>
                    <div className="profile-close" onClick={() => setToggleProfile(!toggleProfile)}><i className="fas fa-times"></i></div>

                    <h2>Profile</h2>
                    <div className="profile-info">
                        {state.user}
                    </div>

                    <div className="profile-favorites">
                        <h3>Favorites</h3>
                        <ul>
                            {favoriteArray()}
                        </ul>
                    </div>

                    <div className="profile-friends">
                        <h3>Friends</h3>
                        <ul>
                            <li>Friend 1</li>
                            <li>Friend 2</li>
                            <li>Friend 3</li>
                            <li>Friend 4</li>
                        </ul>
                    </div>

                </div>


            </div>
        </>

    )
}

export default Chat;






