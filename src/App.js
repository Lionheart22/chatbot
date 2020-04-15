import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  useRef
} from 'react';
import './App.css';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import Message from './Message';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
  }
});
Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: process.env.REACT_APP_REGION,
    aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`
  })
);

const initialState = { messages: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'addMessage':
      return { messages: [...state.messages, action.payload] };
    default:
      throw new Error();
  }
}

export default function App() {
  const [msg, setMsg] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState('Claire Astle');
  const textInput = useRef(null);

  console.log(state.messages);

  useEffect(() => {
    Amplify.PubSub.subscribe('chatbot').subscribe({
      next: data => {
        console.log('Message received', data);
        dispatch({ type: 'addMessage', payload: data.value });
      },
      error: error => console.error(error),
      close: () => console.log('Done')
    });
    textInput.current.focus();
  }, []);

  const publishMessage = async () => {
    await PubSub.publish('chatbot', {
      msg: msg,
      user: user
    });

    setMsg('');
    textInput.current.focus();
  };

  const handleMsgChange = event => {
    setMsg(event.target.value);
  };

  const handleChangeUser = user => {
    setUser(user);
  };

  return (
    <Fragment>
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-item">THE LITTLE CHAT</span>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <span
                  className={
                    user === 'Nelson Larios'
                      ? 'button is-primary'
                      : 'button is-light'
                  }
                  onClick={() => handleChangeUser('Nelson Larios')}
                >
                  <strong>Nelson</strong>
                </span>
                <span
                  className={
                    user === 'Claire Astle'
                      ? 'button is-primary'
                      : 'button is-light'
                  }
                  onClick={() => handleChangeUser('Claire Astle')}
                >
                  Claire
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-primary is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="tile is-ancestor is-vertical">
            <Message message={'Hello, Claire!'} user={'Nelson Larios'} />

            <Message message={'Hello, Nelson'} user={'Claire Astle'} />

            {state.messages.map(message => (
              <Message message={message.msg} user={message.user} />
            ))}
          </div>
        </div>

        <div className="hero-foot">
          <div className="container">
            <div className="field">
              <div className="control">
                <input
                  className="input is-rounded is-primary"
                  type="text"
                  placeholder="Primary input"
                  onChange={handleMsgChange}
                  value={msg}
                  ref={textInput}
                />
              </div>
            </div>
            <div className="field is-pulled-right">
              <div className="control">
                <button
                  className="button is-link  is-small"
                  onClick={publishMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
