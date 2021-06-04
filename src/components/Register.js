import React from 'react';
import '../css/Register.css';

class Register extends React.Component {
  constructor(props) { // create state to capture email/password
      super();
      this.state = {
          name: '',
          email: '',
          password: ''
      }
  }
  onNameChange = (event) => { // get name from form
      this.setState({name: event.target.value})
  }
  onEmailChange = (event) => { // get email from form
      this.setState({email: event.target.value})
  }
  onPasswordChange = (event) => { // get password from form
      this.setState({password: event.target.value})
  }
  onSubmitSignIn = () => { //capture values from email/pass to check data
    //fetch('http://localhost:3001/register', { // localhost
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
  }

  render() {
      const { onRouteChange } = this.props; // destructuring, avoids repeating this.state
      return (
          <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
              <main className="pa4 black-80">
                  <div className="measure">
                      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                          <legend className="f1 fw6 ph0 mh0">Register</legend>
                          <div className="mt3">
                              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                              <input 
                                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                  type="text" 
                                  name="name"  
                                  id="name" 
                                  onChange={this.onNameChange} // pass name value to state
                              />
                          </div>
                          <div className="mt3">
                              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                              <input 
                                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                  type="email" 
                                  name="email-address" 
                                  id="email-address" 
                                  onChange={this.onEmailChange} // pass email value to state
                              />
                          </div>                        
                          <div className="mv3">
                              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                              <input 
                                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                  type="password" 
                                  name="password" 
                                  id="password" 
                                  onChange={this.onPasswordChange} // pass password value to state
                              />
                          </div>
                      </fieldset>
                      <div className="">
                          <input 
                              onClick={this.onSubmitSignIn} // function that gets called to change state to 'home'
                              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                              type="submit" 
                              value="Register" 
                          />
                      </div>
                      <div className="lh-copy mt3">
                          <p onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">or Sign in?</p>
                      </div>
                  </div>
              </main>
          </article>
      );
  }
}

export default Register;