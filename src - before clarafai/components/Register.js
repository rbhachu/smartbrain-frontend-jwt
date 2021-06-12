import React, { Component } from 'react';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
      form: "",
      formErrors: {
        name: "",
        email: "",
        password: "",
        form: ""
      }
    };
  }

  saveAuthTokenInSessions = (token) => { 
    window.sessionStorage.setItem('token', token);
  }


  // on submit function
  handleSubmit = (e) => {
    e.preventDefault();

    // if form details VALID 
    if (formValid(this.state)) {
      //console.log("FORM VALID");
      this.setState({form: ''}) // clear form error
    /////////////////////////////////////////////////////////////////////////
    // Register New User
    fetch(`${process.env.REACT_APP_SERVER_URL}/register`, { // remote heroku version 
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ //convert to JSON format
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) { // does the user exist? Did we receive a user with a property of id?
        this.props.loadUser(user); // add new user to database
      } else {
        //error status if cant connect to postgresql db
        this.setState({form: (<>Unable to connect to Database<br />Please try later</>) })
      }
    })
    //console.log(this.state);
    /////////////////////////////////////////////////////////////////////////
    //Auto Login New User into SmartBrain & Redirect to Home Route
    fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      // if login details valid
      if (data && data.success === "true") {
        this.saveAuthTokenInSessions(data.token)
        this.props.loadUser(data.user)
        this.props.onRouteChange('home');
      // if login details invalid
      } else {
        this.setState({form: (<>Details invalid!<br />Please check your details and try again</>) })
      }
    })
  /////////////////////////////////////////////////////////////////////////
  // if form details INVALID
  } else {
    //console.log("FORM INVALID");
    if ( !this.state.name || !this.state.email || !this.state.password ) {
      this.setState({form: 'Please enter details'})
    } else {
      this.setState({form: 'Please fix form errors!'})
    }
  }

};


// on form change events
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
      formErrors.name =
          value.length < 3 ? "minimum 3 characters" : "";
      break;
      case "email":
      formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
      break;
      case "password":
      formErrors.password =
          value.length < 6 ? "minimum 6 characters" : "";
      break;

      default:
      break;
    }

    this.setState({ formErrors, [name]: value }); // display inline error messages
  };



  render() {
    const { formErrors } = this.state;

    return (
      <article className="center measure">

            <legend className="f1 fw6 ph0 mh0">Register</legend>

              <form id="register">

                <fieldset id="register" className="b--transparent ph0 mh0 text-shadow">

                  <div className="mt3">
                    <label className="db lh-copy f5 black b tl" htmlFor="name">Name</label>
                    <input
                      className={`f5 pa2 input-reset ba bg-white hover-bg-black hover-white w-100${formErrors.name && ' ba bw2 b--red'}`}
                      placeholder="Enter Name"
                      type="text"
                      name="name"
                      noValidate
                      onChange={this.handleChange}
                    />
                    {formErrors.name && (
                      <span className="dib bg-red white ma3 pa2 f5 ttc shadow-1">{formErrors.name}</span>
                    )}
                  </div>

                  <div className="mt3">
                    <label className="db lh-copy f5 black b tl" htmlFor="email-address">Email</label>
                    <input
                      className={`f5 pa2 input-reset ba bg-white hover-bg-black hover-white w-100${formErrors.email && ' ba bw2 b--red'}`} 
                      placeholder="Enter Email"
                      type="email"
                      name="email"
                      noValidate
                      onChange={this.handleChange}
                    />
                    {formErrors.email && (
                      <span className="dib bg-red white ma3 pa2 f5 ttc shadow-1">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="mt3">
                    <label className="db lh-copy f5 black b tl" htmlFor="password">Password</label>
                    <input
                      className={`f5 pa2 input-reset ba bg-white hover-bg-black hover-white w-100${formErrors.password && ' ba bw2 b--red'}`}
                      placeholder="Enter Password"
                      type="password"
                      name="password"
                      noValidate
                      onChange={this.handleChange}
                    />
                    {formErrors.password && (
                      <span className="dib bg-red white ma3 pa2 f5 ttc shadow-1">{formErrors.password}</span>
                    )}
                  </div>

                </fieldset>

              <div className="mt3 tc">
                <button
                  onClick={this.handleSubmit} // function that gets called to change state to 'home'
                  className="b ph3 pv2 input-reset ba bg-black white grow pointer f6 dib hover-bg-yellow ttu shadow-1"
                  type="submit" 
                  value="Register"
                >Register</button>
                {this.state.form && (
                  <><br /><span className="dib bg-red white ma3 pa2 f5 ttc shadow-1 lh-copy">{this.state.form}</span></>
                )}
              </div>

            </form>

      </article>
    );

  }
}

export default Register;