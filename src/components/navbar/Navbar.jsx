import React from 'react';
import styles from './NavBar.local.css';


class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    // this.functionOne.bind(this);
  }

  // functionOne() {

  // }

  render() {
    return (
      <>
        <div className={styles.navbar}>
          <div href="#home">Home</div>
          <div href="#portfolio">Portfolio</div>
          <div href="#about">About</div>
          <div href="message">Message</div>
        </div>
      </>
    )
  }

}

export default NavBar