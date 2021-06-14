import React, { Component } from 'react';

import Tabs from "../components/Tabs";
import Register from '../components/Register';
import Signin from '../components/Signin';
import Signout from '../components/Signout';
import Profile from '../components/Profile';
import ImageLinkForm from '../components/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition';
import imgBrain from '../assets/brain-color.png'
import Tilt from 'react-parallax-tilt';
import Particles from "react-tsparticles";


  const initialState = {
    input: '', // search form
    imageUrl: '', // image url
    boxes: [], // face boxes
    route: 'signin', // default route
    isProfileOpen: false, // 
    isSignedIn: false, // 
    status: '', // status messages
    errors: '', // error messages
    user: { // user details
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    }
  }
  
  class App extends Component {
  
  constructor() {
    super();
    this.state = initialState;
  }


  // JWT Token/Session
  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
              fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user)
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log)
    }
  }
  // Logged In User Details
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  // Face API Bounding Box
  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage'); // get image dimensions
    const width = Number(image.width); // image width
    const height = Number(image.height); // image height
    const boxData = data.outputs[0].data.regions
    //console.log(`image width: ${width}`)
    //console.log(`image height: ${height}`)

    if (boxData) { // if boxData not empty
      this.setState({status: `${boxData.length} human face(s) detected`});
      return boxData.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });      
    } else { // if boxData empty
      // IF 'NO' FACES DETECTED IN IMAGE
      //console.log(`empty`)
      this.setState({errors: (`no human face(s) detected, please try another image`) });
    }
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  // ImageLinkForm
  onInputChange = (e) => {
    this.setState({input: e.target.value}); // get value from form input
  }

  // reset all form values
  onSubmitReset = () => {
    this.setState({imageUrl: this.state.input});
    this.setState({input:''}) // clear input form value after submit to avoid dupe submit
    this.setState({boxes: []}); // reset box data
    this.setState({status: ''}); // reset status
    this.setState({errors: ''}); // reset errors
  }

  // ADD CHECK FORM
  onSubmitImage = (e) => {
    e.preventDefault(e);
    this.onSubmitReset(); // call function to reset all form values

    if (this.state.input.length === 0) {
      this.setState({errors: 'Please paste an image link into the form field to test'});
    } else {
      fetch(`${process.env.REACT_APP_SERVER_URL}/imageurl`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/image`, {
              method: 'put',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
              },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))          
              })
              .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
      }

  }

  //Route Change Function
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route});
  }


  render() {

    const { isSignedIn, imageUrl, route, boxes, user } = this.state;


  return (

    <>

      <Particles className='particles'
      id="tsparticles"
      url={`${process.env.REACT_APP_CLIENT_URL}/particles.json`}
      />

      <div className="wrapper">

        <header>
          <Tilt className="Tilt" options={{ max : 55 }} >
            <h1 className="f2 black b">SmartBrain</h1>
            <img src={imgBrain} width="50" height="50" alt="SmartBrain" title="SmartBrain" />
          </Tilt>
        </header>  


        <section>

          { // Home
          isSignedIn && route === 'home' &&
          (
            <Tabs>
              <article label="tab1" id="Home">
                <div className="content shadow-5">
                  <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onSubmitImage={this.onSubmitImage}
                    input={this.state.input}
                    status={this.state.status}
                    errors={this.state.errors}
                    name={this.state.user.name}
                    entries={this.state.user.entries}
                  />
                    {/* <MyComponent /> */}
                  { this.state.imageUrl && 
                    <FaceRecognition 
                      boxes={boxes} 
                      imageUrl={imageUrl} 
                      errors={this.state.errors} 
                  /> }
                </div>
              </article>

              <article label="tab2" id="View Profile">
                <div className="content shadow-5">
                  <Profile 
                    user={user} 
                    loadUser={this.loadUser} 
                  />
                </div>
              </article>        

              <article label="tab3" id="Sign-Out">
                <div className="content shadow-5">
                  <Signout 
                    onSubmitReset={this.onSubmitReset}
                    onRouteChange={this.onRouteChange} 
                  />
                </div>
              </article>     
            </Tabs>
          )
          }

          { // Sign In / Register
          !isSignedIn && route === 'signin' &&
            (
              <Tabs>
                <article label="tab1" id="Sign-In">
                  <div className="content shadow-5">
                  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  </div>
                </article>

                <article label="tab2" id="Register">
                  <div className="content shadow-5">
                  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  </div>
                </article>
              </Tabs>
            )
          }

        </section>
    
      </div>
    
    </>

  );

  }

}

export default App;