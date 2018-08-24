import React, { Component } from 'react';

const janedoe = [
    {
        id:1,
        senderId: "perborgen",
        text: "who'll win?fsghdgjhdgjfgxjgxhnbnxfghvxcn`dfhjmnbvdfghjkl;jhgfdsdftjkhjgfdsfghjkmhngbfdsfgh tgbfzdzgxhdjnbgfvds rdahfbzvcxf rfadg vzc gh asdgvz  dfgbxcvb dfgdf g gxfbx"
    },
    {
        id:2,
        senderId: "janedoe",
        text: "I will!"
    },
    {
        id:3,
        senderId: "perborgen",
        text: "3"
    },
    {
        id:4,
        senderId: "janedoe",
        text: "4"
    },
    {
        id:5,
        senderId: "perborgen",
        text: "5"
    },
    {
        id:6,
        senderId: "janedoe",
        text: "6   "
    },
    {
        id:7,
        senderId: "perborgen",
        text: "7c"
    },
    {
        id:8,
        senderId: "janedoe",
        text: "fsghdgjhdgjfgxjgxhnbnxfghvxcn`dfhjmnbvdfghjkl;jhgfdsdftjkhjgfdsfghjkmhngbfdsfgh tgbfzdzgxhdjnbgfvds rdahfbzvcxf rfadg vzc gh asdgvz  dfgbxcvb dfgdf g gxfbx"

    },
    {
        id:9,
        senderId: "janedoe",
        text: "4"
    },
    {
        id:10,
        senderId: "perborgen",
        text: "5"
    },
    {
        id:11,
        senderId: "janedoe",
        text: "6   "
    },
    {
        id:12,
        senderId: "perborgen",
        text: "7c"
    },
    {
        id:13,
        senderId: "janedoe",
        text: "4"
    },
    {
        id:14,
        senderId: "perborgen",
        text: "5"
    },
    {
        id:15,
        senderId: "janedoe",
        text: "6   "
    },
    {
        id:16,
        senderId: "perborgen",
        text: "7c"
    },
    {
        id:17,
        senderId: "janedoe",
        text: "4"
    },
    {
        id:18,
        senderId: "perborgen",
        text: "5"
    },
    {
        id:19,
        senderId: "janedoe",
        text: "6   "
    },
    {
        id:20,
        senderId: "perborgen",
        text: "7c"
    },
];

const newnew = [
    {
        id:1,
        senderId: "perborgen",
        text: "who'll win?fsghdgjhdgjfgxjgxhnbnxfghvxcn`dfhjmnbvdfghjkl;jhgfdsdftjkhjgfdsfghjkmhngbfdsfgh tgbfzdzgxhdjnbgfvds rdahfbzvcxf rfadg vzc gh asdgvz  dfgbxcvb dfgdf g gxfbx"
    },
    {
        id:2,
        senderId: "newnew",
        text: "I will!"
    },
    {
        id:3,
        senderId: "perborgen",
        text: "3"
    },
    {
        id:4,
        senderId: "newnew",
        text: "4"
    },
    {
        id:5,
        senderId: "newnew",
        text: "5"
    },
    {
        id:10,
        senderId: "perborgen",
        text: "5"
    },
    {
        id:14,
        senderId: "perborgen",
        text: "5"
    },
    {
        id:15,
        senderId: "newnew",
        text: "6   "
    },
    {
        id:16,
        senderId: "perborgen",
        text: "7c"
    },
    {
        id:17,
        senderId: "newnew",
        text: "4"
    },
    {
        id:18,
        senderId: "perborgen",
        text: "5"
    },
    {
        id:19,
        senderId: "newnew",
        text: "6   "
    },
    {
        id:20,
        senderId: "perborgen",
        text: "7c"
    },
];

const name = [
    {
        id:1,
        senderId: "perborgen",
        text: "who'll win?fsghdgjhdgjfgxjgxhnbnxfghvxcn`dfhjmnbvdfghjkl;jhgfdsdftjkhjgfdsfghjkmhngbfdsfgh tgbfzdzgxhdjnbgfvds rdahfbzvcxf rfadg vzc gh asdgvz  dfgbxcvb dfgdf g gxfbx"
    },
    {
        id:2,
        senderId: "name",
        text: "I will!"
    },
    {
        id:3,
        senderId: "perborgen",
        text: "3"
    },
    {
        id:4,
        senderId: "name",
        text: "4"
    },
    {
        id:20,
        senderId: "perborgen",
        text: "7c"
    },
];

const somebody = [
    {
        id:1,
        senderId: "perborgen",
        text: "Hello"
    },
];

class SendMessage extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value,
        })
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            //на сервер
            this.setState({
                message: ''
            });
        }
    }

    render() {
        const {
            message,
        } = this.state;

        return (
            <div id="send_message">
                <input
                    type="text"
                    value={message}
                    onChange={this.handleChange}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
        );
    }
}

class Messages extends Component {
    render() {
        const {
            messages,
            session,
        } = this.props;

        return (
            <div id="message_form">
                {messages.map(message => {
                    return (
                        <div key={message.id} className={message.senderId === session ? 'message_user' : 'message_other'} >
                            <p>{message.text}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            session: 'perborgen',
            sender: 'janedoe'
        };
        this.selectUser = this.selectUser.bind(this);
    }

    selectUser(e, user) {
        let elements = document.getElementsByClassName('chat_user');
        for(let i = 0, length = elements.length; i < length; i++) {
            elements[i].style.backgroundColor = '#c1bdba';
        }
        if (e.target.className === 'chat_user') {
            e.target.style.backgroundColor = '#aba6a1';
        }
        else if (e.target.parentNode.className === 'chat_user_image') {
            e.target.parentNode.parentNode.style.backgroundColor = '#aba6a1';
        }
        else {
            e.target.parentNode.style.backgroundColor = '#aba6a1';
        }
        document.getElementById('messages').style.display = 'unset';
        this.setState({messages: user});
    }

    render() {
        const {
            messages,
            session,
            // sender,
        } = this.state;

        return (
            <div id="chat">
                <div id="list_of_people">
                    <div className="chat_user" onClick={(e) => this.selectUser(e, janedoe)}>
                        <div className="chat_user_image">
                            <img src={require('../../../images/test.jpg')} alt="name" />
                        </div>
                        <p>janedoe</p>
                    </div>
                    <div className="chat_user" onClick={(e) => this.selectUser(e, newnew)}>
                        <div className="chat_user_image">
                            <img src={require('../../../images/test.jpg')} alt="name" />
                        </div>
                        <p>newnew</p>
                    </div>
                    <div className="chat_user" onClick={(e) => this.selectUser(e, name)}>
                        <div className="chat_user_image">
                            <img src={require('../../../images/test.jpg')} alt="name" />
                        </div>
                        <p>Name</p>
                    </div>
                    <div className="chat_user" onClick={(e) => this.selectUser(e, somebody)}>
                        <div className="chat_user_image">
                            <img src={require('../../../images/test.jpg')} alt="name" />
                        </div>
                        <p>Somebody</p>
                    </div>
                </div>
                <div id="messages">
                    <Messages messages={messages} session={session} />
                    <SendMessage />

                </div>
            </div>
        );
    }
}