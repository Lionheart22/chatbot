import React from 'react';
import claire from './claire.jpg';
import nelson from './nelson_quadrado.png';

export default function Message({ message, user }) {
  const marginLeft = '30px';
  const marginRight = '30px';

  return (
    <div
      class="tile"
      style={
        user === 'Claire Astle'
          ? { marginTop: '12px', marginLeft: marginLeft }
          : { marginTop: '12px', marginRight: marginRight }
      }
    >
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-32x32">
              <img
                src={user === 'Claire Astle' ? claire : nelson}
                alt="Image"
              />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{user}</strong> <br />
                {message}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
