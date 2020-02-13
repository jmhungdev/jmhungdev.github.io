import React from 'react';
import MainBckVideo from './mainbckvideo/MainBckVideo.jsx';
import MainFrntOverlay from './mainfrntoverlay/mainFrntOverlay.jsx';
import './style.global.css';


class App extends React.Component {

  render(){
    return  (
    <>
    <MainBckVideo/>
    <MainFrntOverlay/>

    </>
    )
  }
}

export default App