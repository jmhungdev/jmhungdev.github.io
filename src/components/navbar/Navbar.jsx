import React from 'react';
import styles from './NavBar.local.css';
import Hamburger from '../svg/hamburger.jsx';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuState: false
    }

    this.toggleMenuState = this.toggleMenuState.bind(this);
  }

  toggleMenuState() {
    let notState = !this.state.menuState;
    this.setState({ menuState: notState });
  }
  render() {
    return (
      <>
        <nav className={styles.menu}>
          <Hamburger toggle={this.toggleMenuState} />
          <ul>
            <li href="#home">Home</li>
            <li href="#portfolio">Portfolio</li>
            <li href="#about">About</li>
            <li href="message">Message</li>
          </ul>
        </nav>
      </>
    )
  }

}

export default NavBar