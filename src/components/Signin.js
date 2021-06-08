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


class Signin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      form: "",
      formErrors: {
        email: "",
        password: "",
        form: ""
      }
    };
  }


  // token generation for session
  saveAuthTokenInSessions = (token) => { 
    //window.localStorage.setItem('token', token); // local storage
    window.sessionStorage.setItem('token', token); // session storage
    //window.sessionStorage.setItem('token', token, { maxAge: 1 }); // works on own
    //window.sessionStorage.setItem('token', token, { expiresIn: 1 });

  }


handleSubmit = (e) => {
  e.preventDefault();

  if (formValid(this.state)) {
    console.log("FORM VALID");
    this.setState({form: ''}) // clear form error
    /*
    console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    */
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
        this.saveAuthTokenInSessions(data.token) // generate token for session
        this.props.loadUser(data.user) // login into db
        this.props.onRouteChange('home'); // redirect to home route
      // if login details invalid
      } else {
        this.setState({form: 'Login details invalid, please check your details and try again'})
      }
    })
    
  } else {
    console.log("FORM INVALID");
    //this.setState({form: 'Please fix form errors!'})

    if ( !this.state.email || !this.state.password ) {
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
      case "email":
      formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
      break;
      case "password":
      formErrors.password =
          value.length < 1 ? "password required" : "";
      break;

      default:
      break;
  }

  this.setState({ formErrors, [name]: value }); // display inline error messages
  //this.setState({ formErrors, [name]: value }, () => console.log(this.state)); display inline error messages + console in too
};










  render() {
    const { formErrors } = this.state;
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>

            <form id="signin">
          
            <fieldset id="signin" className="ba b--transparent ph0 mh0">
             
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
                value="Sign In"
              />
              {this.state.form && (
                  <span className="error">{this.state.form}</span>
              )}
            </div>

            </form>

            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black b db pointer">or Register?</p>
            </div>

          </div>
      </main>
    </article>

    );
  }
}

export default Signin;