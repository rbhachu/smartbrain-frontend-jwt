import React, { Component } from 'react';
import '../css/Register.css';


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


handleSubmit = (e) => {
  e.preventDefault();

  if (formValid(this.state)) {
    console.log("FORM VALID");
    this.setState({form: ''}) // clear form error
    /*
    console.log(`
        --SUBMITTING--
        Name: ${this.state.name}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    */


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
        //if (user) { // check user data passing
        if (user.id) { // does the user exist? Did we receive a user with a property of id?
            this.props.loadUser(user); // add new user to database
            this.props.onRouteChange('home'); // if they do load home route
        }
    })
    //console.log(this.state);
    //this.props.onRouteChange('home'); // on form submit change route to home


  } else {
    console.log("FORM INVALID");
    //this.setState({form: 'Please fix form errors!'})

    if ( !this.state.name || !this.state.email || !this.state.password ) {
      //console.log('null1')
      this.setState({form: 'Please enter details'})
    } else {
      //console.log('null2')
      this.setState({form: 'Please fix form errors!'})
    }

  }

};


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
    //this.setState({ formErrors, [name]: value }, () => console.log(this.state)); display inline error messages + console in too
};



render() {
  const { formErrors } = this.state;
  const { onRouteChange } = this.props; // destructuring, avoids repeating this.state

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <legend className="f1 fw6 ph0 mh0">Register</legend>

            <form id="register">

            <fieldset id="register" className="ba b--transparent ph0 mh0">

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className={`b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100${formErrors.name && ' error-input'}`}
                  placeholder="Enter Name"
                  type="text"
                  name="name"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.name && (
                  <span className="error">{formErrors.name}</span>
                )}
              </div>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className={`b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100${formErrors.email && ' error-input'}`} 
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email && (
                  <span className="error">{formErrors.email}</span>
                )}
              </div>

              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className={`b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100${formErrors.password && ' error-input'}`}
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.password && (
                  <span className="error">{formErrors.password}</span>
                )}
              </div>

            </fieldset>

            <div className="">
              <input
                onClick={this.handleSubmit} // function that gets called to change state to 'home'
                className="b ph3 pv2 input-reset ba bg-black white grow pointer f6 dib" 
                type="submit" 
                value="Register"
              />
              {this.state.form && (
                  <span className="error">{this.state.form}</span>
              )}
            </div>

            </form>

            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('signin')} className="f6 link dim black b db pointer">or Signin?</p>
            </div>

        </div>
      </main>
    </article>

    );
  }
}

export default Register;