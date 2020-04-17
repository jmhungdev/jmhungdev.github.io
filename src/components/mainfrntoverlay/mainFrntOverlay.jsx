import React from 'react';
import styles from './MainFrntOverlay.local.css';
import NavBar from '../navbar/NavBar.jsx';
import Frame from './frame.svg';


class MainFrntOverlay extends React.Component {

  constructor(props) {
    super(props);
    // reference to the DOM node
    this.myElement = null;
    // reference to the animation
    this.myTween = null;
  }

  componentDidMount() {
    // use the node ref to create the animation
  
    // this.myTween = TweenLite.to(this.myElement, 2, { x: 600, ease: "bounce.out()"});
    // console.log(this.myTween, 'my tween inside componentDidMount');
  }

  render() {
    // console.log(this.myTween, 'this is my tween');
    
    return (
      <>
      <nav id="menu" className="menu-overlay">
        <div className={styles.menu}>
          {/* <ul>
            <li> About </li>
            <li> Blog  </li>
          </ul> */}
        </div>
      </nav>
      <nav id="anti-menu" className="menu-anti-overlay">

      </nav>
      </>
    )
  }

}

export default MainFrntOverlay;