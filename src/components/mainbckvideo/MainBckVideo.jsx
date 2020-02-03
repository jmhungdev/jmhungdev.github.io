import React from 'react';
import './iss.mp4';
import styles from './MainBckVideo.local.css';

export default class MainBckVideo extends React.Component {

  render() {
    return (
      <div>
        <video className={styles.video} autoPlay muted loop playsInline>
          <source src="./iss.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }
};

