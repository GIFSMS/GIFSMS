(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{113:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(48),r=c.n(a),i=(c(57),c(49)),o=c(50),u=c(52),j=c(51),l=(c(29),c(58),c(8)),h=c(0);var d=Object(l.c)((function(){var e=Object(l.b)(),t=e.isAuthenticated,c=e.loginWithRedirect;return!t&&Object(h.jsxs)("div",{className:"login-box",children:[Object(h.jsx)("h1",{children:"GIFSMS"}),Object(h.jsx)("button",{onClick:c,children:"Login Here"})]})})),b=c(14),m=c.n(b),f=c(28),O=c(15),p=c(9),g=c(7),v=c(66),x=c(84);c(110).config();var y=x.connect("".concat("http://gifsms-env.eba-pn2gaatk.us-east-2.elasticbeanstalk.com","/gifs")),k=function(e){var t=e.user,c=Object(n.useState)({message:"",user:""}),s=Object(g.a)(c,2),a=s[0],r=s[1],i=Object(n.useState)([]),o=Object(g.a)(i,2),u=o[0],j=o[1],l=Object(n.useState)([]),d=Object(g.a)(l,2),b=d[0],x=d[1],k=Object(n.useState)([]),C=Object(g.a)(k,2),N=C[0],w=C[1],S=Object(n.useState)(""),A=Object(g.a)(S,2),q=A[0],E=A[1],P=Object(n.useState)([]),U=Object(g.a)(P,2),W=U[0],H=U[1],I=Object(n.useState)("Main Room"),R=Object(g.a)(I,2),_=R[0],B=R[1];Object(n.useEffect)((function(){y.on("user joined",(function(e){console.log(e),j((function(t){return[].concat(Object(O.a)(t),[{type:"notification",message:"User ".concat(e.user," has joined the room"),user:e.user}])}))})),y.on("get participants",(function(e){x(e.participants)})),y.on("get rooms",(function(e){w(e.rooms)})),y.on("message",(function(e){j((function(t){return[].concat(Object(O.a)(t),[{message:e.message,user:e.user}])}))})),r(Object(p.a)(Object(p.a)({},a),{},{user:t})),y.on("user disconnected",(function(e){j((function(t){return[].concat(Object(O.a)(t),[{type:"notification",message:"User ".concat(e.user," has left the room"),user:e.user}])}))}))}),[]),Object(n.useEffect)((function(){if(a.user){var e=[];v.get("https://api.giphy.com/v1/gifs/trending?limit=5").query({api_key:"".concat("w904uPC35tKH7ajw1vZr8uyNgBq2E5U7")}).then((function(t){t.body.data.forEach((function(t){e.push(t.images.fixed_width.url)})),H((function(t){return[].concat(e)}))})).catch((function(e){console.log("Womp Womp",e)})),y.emit("join",{user:a.user,room:"Main Room"})}}),[a.user]);var G={set:[]};G.handleAPICall=function(){var e=Object(f.a)(m.a.mark((function e(t,c){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n="https://api.giphy.com/v1/gifs/search?q=".concat(a.message,"&limit=5"),v.get(n).query({api_key:"".concat("w904uPC35tKH7ajw1vZr8uyNgBq2E5U7")}).then((function(e){G.results=e,G.results.body.data.forEach((function(e){G.set.push(e.images.fixed_width.url)})),H((function(e){return Object(O.a)(G.set)})),G.set=[]})).catch((function(e){console.log("Womp Womp",e)}));case 2:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}();var J,M=function(){var e=Object(f.a)(m.a.mark((function e(t,c){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n="https://api.giphy.com/v1/gifs/translate?s=".concat(a.message),v.get(n).query({api_key:"".concat("w904uPC35tKH7ajw1vZr8uyNgBq2E5U7")}).then((function(e){var t=e.body.data;y.emit("message",{message:t.images.fixed_width.url,user:a.user,room:_})})).catch((function(e){console.log("Womp Womp")}));case 2:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),F=function(e){var t=e.target.getAttribute("room");_!==t&&(_&&y.emit("leave",{user:a.user,room:_}),j([]),y.emit("join",{user:a.user,room:t}),B(t))};return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"chat-container",children:[Object(h.jsxs)("div",{className:"side-nav",children:[Object(h.jsxs)("div",{className:"rooms",children:[Object(h.jsx)("h2",{children:"Chat Rooms"}),N&&Object(h.jsx)(h.Fragment,{children:N.map((function(e,t){return Object(h.jsx)("div",{children:Object(h.jsxs)("h3",{room:e,onClick:F,children:[e," ",e===_?" - active":""]})},t)}))}),Object(h.jsxs)("div",{className:"create-room",children:[Object(h.jsx)("input",{type:"text",placeholder:"Create Room",value:q,onChange:function(e){return E(e.target.value)}}),Object(h.jsx)("button",{onClick:function(){q&&(j([]),y.emit("join",{user:a.user,room:q}),B(q)),E("")},children:Object(h.jsx)("i",{class:"fas fa-plus-square"})})]})]}),Object(h.jsxs)("div",{className:"participants",children:[Object(h.jsx)("h2",{children:"Chat Participants"}),b&&Object(h.jsx)(h.Fragment,{children:_?b.map((function(e,t){return Object(h.jsx)("div",{children:Object(h.jsx)("h3",{children:e})},t)})):""})]})]}),Object(h.jsxs)("div",{className:"chat",children:[Object(h.jsx)("h2",{children:"Chat"}),Object(h.jsx)("div",{className:"chatArea",children:u.map((function(e,t){var c=e.message,n=e.user;return"notification"===e.type?Object(h.jsx)("div",{className:"notification",children:Object(h.jsx)("h4",{children:c})},t):Object(h.jsx)("div",{className:n===a.user?"my-message":"message",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{alt:t,src:c}),Object(h.jsx)("h2",{children:n})]})},t)}))})]}),Object(h.jsxs)("div",{className:"searcher",children:[Object(h.jsx)("div",{className:"search-side",children:Object(h.jsx)("h2",{children:"Giphys"})}),Object(h.jsxs)("div",{className:"search-gifs",children:[Object(h.jsx)("input",{placeholder:"Search Giphs",type:"text",onChange:function(e){return function(e){r(Object(p.a)(Object(p.a)({},a),{},{message:e.target.value}))}(e)},onKeyDown:function(e){return function(e){"Enter"===e.key&&G.handleAPICall()}(e)},value:a.message}),Object(h.jsx)("button",{onClick:G.handleAPICall,children:"Giph Me"})]}),Object(h.jsx)("button",{onClick:M,children:"Random Giph!"}),Object(h.jsx)("div",{className:"gifTown",children:(J=W,J.map((function(e){return Object(h.jsx)("div",{className:"gif-prev",children:Object(h.jsx)("img",{src:e,alt:e,onClick:function(e){return function(e){e.preventDefault(),y.emit("message",{message:e.target.src,user:a.user,room:_}),r(Object(p.a)(Object(p.a)({},a),{},{message:""}))}(e)}})})})))})]})]})})},C=function(e){Object(u.a)(c,e);var t=Object(j.a)(c);function c(e){var n;return Object(i.a)(this,c),(n=t.call(this,e)).state={user:{}},n}return Object(o.a)(c,[{key:"userSetter",value:function(e){this.setState({user:{info:e}})}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("header",{className:"App-header"}),Object(h.jsx)("body",{children:this.props.auth0.isAuthenticated?Object(h.jsx)(k,{user:this.props.auth0.user.nickname}):Object(h.jsx)(d,{})})]})}}]),c}(s.a.Component),N=Object(l.c)(C);r.a.render(Object(h.jsx)(l.a,{domain:"ardentallegory.us.auth0.com",clientId:"YXCJJSd1H6bb6zMJXZrzqjBbU7lA0PHk",redirectUri:window.location.origin,children:Object(h.jsx)(N,{})}),document.getElementById("root"))},29:function(e,t,c){},57:function(e,t,c){},58:function(e,t,c){},78:function(e,t){}},[[113,1,2]]]);
//# sourceMappingURL=main.85dcf47f.chunk.js.map