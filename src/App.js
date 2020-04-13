import React, { Component, Fragment } from 'react';
import './App.css';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import nelson from './nelson_quadrado.png';
import claire from './claire.jpg';

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
              <div
                class="tile"
                style={{ marginTop: '12px', marginRight: this.marginRight }}
              >
                <div class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-32x32">
                        <img src={nelson} alt="Image" />
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>Nelson Larios</strong> <br />
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aenean efficitur sit amet massa fringilla
                          egestas. Nullam condimentum luctus turpis.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              <div
                class="tile"
                style={{ marginTop: '12px', marginLeft: this.marginLeft }}
              >
                <div class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-32x32">
                        <img src={claire} alt="Image" />
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>Claire Astle</strong> <br />
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aenean efficitur sit amet massa fringilla
                          egestas. Nullam condimentum luctus turpis.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              <div
                class="tile"
                style={{ marginTop: '12px', marginRight: this.marginRight }}
              >
                <div class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-32x32">
                        <img src={nelson} alt="Image" />
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>Nelson Larios</strong> <br />
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aenean efficitur sit amet massa fringilla
                          egestas. Nullam condimentum luctus turpis.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              <div
                class="tile"
                style={{ marginTop: '12px', marginLeft: this.marginLeft }}
              >
                <div class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-32x32">
                        <img src={claire} alt="Image" />
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>Claire Astle</strong> <br />
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aenean efficitur sit amet massa fringilla
                          egestas. Nullam condimentum luctus turpis.
                        </p>
                      </div>
                    </div>
                  </article>
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
