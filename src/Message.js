import React from 'react';
import claire from './claire.jpg';
import nelson from './nelson_quadrado.png';

export default function Message({ message, user }) {
  const marginLeft = '30px';
  const marginRight = '30px';

  return (
    <div
      className="tile"
      style={
        user === 'Claire Astle'
          ? { marginTop: '12px', marginLeft: marginLeft }
          : { marginTop: '12px', marginRight: marginRight }
      }
    >
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-32x32">
              <img
                src={user === 'Claire Astle' ? claire : nelson}
                alt="Avatar"
              />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
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
