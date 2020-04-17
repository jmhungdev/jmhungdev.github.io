import React from 'react';
import styles from './About.local.css'


class About extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <>
        <section className={styles.about}>
          This is ABOUT
        </section>
      </>
    )
  }

}

export default About