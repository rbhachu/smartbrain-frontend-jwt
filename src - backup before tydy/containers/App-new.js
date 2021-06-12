import React, { Component } from 'react';
import Tabs from "../components/Tabs";
import Register from '../components/Register';
import Signin from '../components/Signin';
import Signout from '../components/Signout';

import 'tachyons';

import Rank from '../components/Rank';
import ImageLinkForm from '../components/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition';
import Profile from '../components/Profile';
//import Modal from '../components/Modal';
//import 'bootstrap/dist/css/bootstrap.css';


  const initialState = {
    input: '', // search form
    imageUrl: '', // image url
    boxes: [], // face boxes
    route: 'signin', // default route
    //route: 'register', // default route
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
    //this.particlesInit = this.particlesInit.bind(this);
    //this.particlesLoaded = this.particlesLoaded.bind(this);
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
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxData = data.outputs[0].data.regions
    //console.log(`boxData Length: ${boxData.length}`) // disable as breaks code

    if (boxData) {
      this.setState({status: `${boxData.length} human face(s) detected 😀`});
      return boxData.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });
    } else {
      // IF 'NO' FACES DETECTED IN IMAGE
      //console.log(`empty`)
      this.setState({errors: 'no human face(s) detected, please try another image 😔'});
    }

  }


  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }


  // ImageLinkForm
  onInputChange = (event) => {
    this.setState({input: event.target.value}); // get value from form input
  }

  // ADD CHECK FORM
  onSubmitImage = (event) => {
    event.preventDefault();
    this.setState({imageUrl: this.state.input});
    this.setState({input:''}) // clear input form value after submit to avoid dupe submit
    this.setState({boxes: []}); // reset box data
    this.setState({status: ''}); // reset status
    this.setState({errors: ''}); // reset errors

    //if (inputValue.length === 0) {
    if (this.state.input.length === 0) {
      //alert(`inputvalue: ${inputValue}`);
      this.setState({errors: 'Please paste an image link to test in the field below'});
      //errorValue = "Image Empty"
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
      //this.setState({route: 'signin'})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route});
    console.log(`isSignedIn ${this.state.isSignedIn}`)
    console.log(`onRouteChange ${this.state.route}`)
  }

  // toggle state for modal/user Profile
  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  }



  render() {

    const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;

  return (
    <div className="wrapper">

      <header>
        <h1>SmartBrain [logo]</h1>
      </header>  


      <section>
{ 
  route === 'home' ? 
  (
    <Tabs>
          <article label="tab1" id="Home">
            <div className="content">
                {/* <Logo /> */}
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
                <ImageLinkForm
                  input={this.state.input}
                  onInputChange={this.onInputChange}
                  onSubmitImage={this.onSubmitImage}
                  status={this.state.status}
                  errors={this.state.errors}
                />
                {this.state.imageUrl && <FaceRecognition boxes={boxes} imageUrl={imageUrl} errors={this.state.errors} />}
            </div>
          </article>

          <article label="tab2" id="View Profile">
            <div className="content">
              <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
            </div>
          </article>        

          <article label="tab3" id="Sign-Out">
            <div className="content">
              {<Signout onRouteChange={this.onRouteChange} onClickTabItem={this.onClickTabItem} />}
            </div>
          </article>     
    </Tabs>
  )
: 
  ''
}


{
route === 'signin' ? 
  (
    <Tabs>
          <article label="tab1" id="Sign-In">
            <div className="content">
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          </article>

          <article label="tab2" id="Register">
            <div className="content">
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          </article>
    </Tabs>
  )
  : 
    ''
}


    </section>

      <footer>
      </footer>

    </div>
    );

  }

}

export default App;