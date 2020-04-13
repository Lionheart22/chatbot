import React, { Component, Fragment } from 'react';
import './App.css';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import nelson from './nelson_quadrado.png';
import claire from './claire.jpg';
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
Amplify.PubSub.subscribe('real-time-weather').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  close: () => console.log('Done')
});
class App extends Component {
  async publishMessage() {
    await PubSub.publish('real-time-weather', {
      msg: 'Hello to all subscribers!'
    });
  }

  marginLeft = '30px';
  marginRight = '30px';
  message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.';

  render() {
    //console.log(process.env);
    return (
      <Fragment>
        <nav class="navbar is-fixed-top">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">THE LITTLE CHAT</a>
            </div>
          </div>
        </nav>
        <section class="hero is-primary is-fullheight-with-navbar">
          <div class="hero-body">
            <div class="tile is-ancestor is-vertical">
              <Message message={this.message} user={'Nelson Larios'} />

              <Message message={this.message} user={'Claire Astle'} />

              <Message message={this.message} user={'Nelson Larios'} />

              <Message message={this.message} user={'Claire Astle'} />
            </div>
          </div>

          <div class="hero-foot">
            <div class="container">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-rounded is-primary"
                    type="text"
                    placeholder="Primary input"
                  />
                </div>
              </div>
              <div class="field is-pulled-right">
                <div class="control">
                  <button class="button is-link  is-small">Send</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
export default App;
