import React from 'react';
import MainBckVideo from './mainbckvideo/MainBckVideo.jsx';
import MainFrntOverlay from './mainfrntoverlay/MainFrntOverlay.jsx';
import Hamburger from './svg/hamburger.jsx';
import About from './about/About.jsx';

import './style.global.css';


class App extends React.Component {

  render() {
    return (
      <>
        <header>
          <Hamburger />
          <MainFrntOverlay />
        </header>
        <main className="container">
          <MainBckVideo />
          <About/>
        </main>
      </>
    )
  }
}

export default App