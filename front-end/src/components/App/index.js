import Login from '../Login';
import Chat from '../Chat';
import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    userSetter(info) {
        this.setState({ user: { info } })
    }

    render() {
        return (
            <div className="App">
                {!this.props.auth0.isAuthenticated
                    ? <Login />
                    : <Chat user={this.props.auth0.user.nickname} authPro={this.props.auth0.user} />}
            </div>
        );
    }

}

export default withAuth0(App);