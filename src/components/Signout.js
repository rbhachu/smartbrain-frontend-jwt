import React, { Component } from 'react';

class Signout extends Component {

  // signout function
  onSignOut = () => {
    sessionStorage.clear(); // clear JWT Token
    this.props.onSubmitReset(); // reset all values for image form
    this.props.onRouteChange('signin'); // re-route to signin
  }

  
  render() {

    return (

      <article className="center tc measure">

        <p className='db fw6 lh-copy f4 mh4 white text-shadow'>Please click on the button below to confirm Sign-Out.</p>
        
        <button 
          className='b ph3 pv2 mv4 input-reset ba bg-black white grow pointer f6 dib hover-bg-yellow ttu shadow-1' 
          onClick={this.onSignOut}
        >Sign-Out
        </button>

      </article>

    );

  }

}

export default Signout;