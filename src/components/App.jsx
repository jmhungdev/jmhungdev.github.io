import React from 'react';
import MainBckVideo from './mainbckvideo/MainBckVideo.jsx';
import './style.global.css';

class App extends React.Component {

  render(){
    return  (
    <>
    <MainBckVideo/>
    <div className="overlay">
        <div className="tag"><a>everything starts with an idea...  - jimmy hung</a></div>
    </div>

    </>
    )
  }
}

export default App