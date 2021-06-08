import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Signin from '../components/Signin';
import Register from '../components/Register';
//import Logo from '../components/Logo';
import Rank from '../components/Rank';
import ImageLinkForm from '../components/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition';
import Profile from '../components/Profile';
import Modal from '../components/Modal';
import Particles from "react-tsparticles";
import 'tachyons';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.css';


const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin', // default route
  //route: 'register', // default route
  isProfileOpen: false,
  isSignedIn: false,
  status: '',
  errors: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    //age: 0,
    //pet: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  // particles
  particlesInit(main) {
    //console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }
  particlesLoaded(container) {
    //console.log(container);
    /*
    particles: {
        number: {
          value: 30
        }
        density: {
          enable: true,
          value_area: 800
        }
      }
    }*/
  }
  /*
  const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }
  */


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
      // IF FACE(S) DETECTED IN IMAGE
      //console.log(`not empty`)

      //const Emoji = [...Array(6)].map((e, i) => <span key={i}>😀</span>)

      /*
      const Field = ({ id: number }) => (<span role="img">😀 </span>)
      const Emoji = (    
        <>
          {[...Array(4)].map((value: undefined, index: number) => (
          <Field id={index + 1} key={index} />
        ))}
        </>
      )
      */

      /*
      class Tbody extends React.Component {
        render () {
          const { rowLimit = 5 } = this.props; // destructure with defaults instead of trinary
          
          return (
            <>
            {
              Array.from({ length: rowLimit }, (_, k) => (
                <span key={k}>test</span>
              ))
            }
            </>
          )
        }  
      }
      const emoji = [...Array(5)].map((elementInArray, index) => ( 
        <div className="">test</div> 
        ) 
    )
    */

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
    //const testval = this.state.boxes
    //console.log(`boxes: ${this.state.boxes}`)
    //!boxes && alert('empty')
    //testval ? alert('not empty') : alert('empty')
  }




  // ImageLinkForm
  onInputChange = (event) => {
    this.setState({input: event.target.value}); // get value from form input
  }

  // ADD CHECK FORM
  onSubmitImage = (event) => {
    event.preventDefault();
    //this.setState({boxes: []}); // reset box data
    this.setState({imageUrl: this.state.input});
    //const inputValue = this.state.input
    //this.setState({inputValue: 'test1'})
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
        //alert("alert1")
        //this.setState({input: 'test1'})
        //this.setState({input: 'test1'})
        //add empty form here
        //form state input = ===

      }

  }


  //Route Change Function
  onRouteChange = (route) => {

    /*
    if (route === 'signout') {
      //return this.setState(initialState)
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    */

    if (route === 'home') {
      //return this.setState(initialState)
      this.setState({isSignedIn: true})
    } else if (route === 'home') {
      this.setState({isSignedIn: false})
    }


    this.setState({route: route});
    console.log(`isSignedIn ${this.state.isSignedIn}`)

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

      <div className="App">
         <Particles className='particles'
            id="tsparticles"
            url="particles.json"
            init={this.particlesInit}
            loaded={this.particlesLoaded}
        />

      <header>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
      </header>

      <section>
        {
          isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
          </Modal>
        }
        { route === 'home'
          ? <div>
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
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </section>

      </div>
    );
  }
}

export default App;