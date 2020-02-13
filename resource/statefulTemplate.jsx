import { Component } from 'react';


class statefulTemplate extends Component {

  constructor(props) {
    super(props);
    state = {
      a: 1,
      b: 2
    }
    this.functionOne.bind(this);
  }

  functionOne() {

  }

  render() {
    return (
      <>
        <div>Test</div>
      </>
    )
  }

}

export default statefulTemplate