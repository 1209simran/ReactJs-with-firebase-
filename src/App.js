import React, { Component } from "react";
import firebaseConf from "./Firebase";
import "./App.css";
import img from "./images/77868.jpg";
import img3 from "./images/quote.png";
import img4 from "./images/quote (1).png";
import img2 from "./images/photo-1497366811353-6870744d04b2.jpeg";
import img5 from "./images/1.jpg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
      alert: false,
      alertData: {}
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: { type, message }
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 4000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  componentWillMount() {
    let formRef = firebaseConf
      .database()
      .ref("form")
      .orderByKey()
      .limitToLast(6);
    formRef.on("child_added", snapshot => {
      const { name, email, phone, message } = snapshot.val();
      const data = { name, email, phone, message };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      name: this.inputName.value,
      email: this.inputEmail.value,

      phone: this.inputPhone.value,
      message: this.textAreaMessage.value
    };
    if (params.name && params.email && params.phone && params.message) {
      firebaseConf
        .database()
        .ref("form")
        .push(params)
        .then(() => {
          this.showAlert("success", "Your message was sent successfull");
        })
        .catch(() => {
          this.showAlert("danger", "Your message could not be sent");
        });
      this.resetForm();
    } else {
      this.showAlert("warning", "Please fill the form");
    }
  }

  render() {
    return (
      <div>
        <div className="text-center" style={{ padding: `20px 0px` }}>
          <p className="font-weight-bold h4" style={{ padding: `7px 0px` }}>
            Corporate Wellness
          </p>
          <button type="button" className="btn btn-primary btn-circle">
            Get Connected
          </button>
        </div>
        <div className="container-fluid no-padding">
          <div className="row">
            <img
              src={img}
              alt="placeholder 960"
              className="img-responsive image"
            />
          </div>

          <div className="wrapper">
            <div className="top ">
              <p className="text">
                <img src={img2} alt="Headshot photo" className="left" />
                Deevship Membership is the fitness benefit of your team
                <br />
                will use.
                <br />
                <br />
                Enhance the employee engagement and track usage
                <br />
                while your emplyees stay healthy and motivated.
                <br />
                <br />
                Deevship is the best way to connect with your team
                <br />
                outside the work.
              </p>
            </div>
          </div>
        </div>
        <div style={{ padding: `30px 0px` }}>
          <p className=" text-center h4" style={{ color: "blue" }}>
            <img
              src={img3}
              alt="my picture"
              className="img-responsive"
              style={{
                float: `18%`
              }}
            />
            "Effective wellness helps for better employee performance at work"
            <img
              src={img4}
              alt="my picture"
              className="img-responsive"
              style={{
                float: `120%`
              }}
            />
          </p>
        </div>
        <div className="wrapper">
          <div className="top1 ">
            <p className="text1">
              <img src={img5} alt="Headshot photo" className="left1" />
              <h3 style={{ marginTop: `5%`, fontWeight: "bold" }}>
                Recieve <br />
                Monthly Reports
              </h3>
            </p>
          </div>
        </div>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <div
          style={{
            background: `rgb(233, 233, 233)`,
            backgroundPosition: "cover",
            paddingLeft: `40%`
          }}
        >
          <div className="container" style={{ padding: `70px 0px` }}>
            <div className="row">
              <div className="col-md-6">
                <h1 className="font-weight-bold text-center">
                  <u> Contact Form</u>
                </h1>
                <form onSubmit={this.sendMessage.bind(this)} ref="contactForm">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      ref={name => (this.inputName = name)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      ref={email => (this.inputEmail = email)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      placeholder="+91-"
                      ref={phone => (this.inputPhone = phone)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="3"
                      ref={message => (this.textAreaMessage = message)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
