import React from 'react';
import styles from './About.local.css';
// import pic from './profilepic.png';

class About extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <>
        <section className={styles.about}>
          <div className={styles.paragraph}>
            <p>
            👋 Hi, I am Jimmy Hung <br />
            🤡 I enjoy designing and creating fullstack solution <br />
            🤖 Comfortable with React / Node with SQL or NoSQL Databases <br />
            👨‍🎓 I have a background in Mathematics, Economics and minored in Computer Science <br />
            👨‍🔬 5+ years as a developer and analyst in healthcare for both provider and payer side<br />
            👉🏻 Stood up reporting service, data visualization, backend and APIs from multiple EHRs<br />
            👉🏻 Created and maintained FHIR resource profiles and FHIR APIs<br />
            👉🏻 Extensive analysis experience in revenue cycle on claim data - 835s and 837s </p>
          </div>
        </section>
      </>
    )
  }

}

export default About