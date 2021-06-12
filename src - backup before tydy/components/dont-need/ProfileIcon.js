import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import profileLogo from '../assets/logo.jpg'

class ProfileIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  // toggle function
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  // signout function
  onSignOut = () => {
    sessionStorage.clear(); // clear JWT Token
    //this.props.onRouteChange('signout'); // redirect to signin route
    this.props.onRouteChange('signin'); // redirect to signin route
    //this.props.isSignedIn(false); // set signin state to false to hide modal
    //this.setState({isSignedIn: false}) // does nothing, but passes, so its not updating global state!
    //this.state.isSignedIn(false); //no
    //this.props.setState({isSignedIn: false}) //no
    //alert('test');
  }


  render() {
    return (
      <div className="pa4 tc">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle
                tag="span"
                onClick={this.toggle}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
              >
                <img
                  src={profileLogo}
                  className="br-100 h3 w3 dib" alt="Profile" title="Profile" />
              </DropdownToggle>
              {/* Old <DropdownMenu className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} right> */}
              <DropdownMenu className='b--transparent shadow-5' style={{marginLeft: '-6rem', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} >
                <DropdownItem onClick={() => this.props.toggleModal()}>View Profile</DropdownItem>
                <DropdownItem onClick={() => this.onSignOut()}>Sign Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;