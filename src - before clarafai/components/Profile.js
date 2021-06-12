import React, { Component } from 'react';
import Rank from '../components/Rank';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name
    }
  }

  
  onButtonUpdate = (data) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        formInput: data
      })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304) {
        //this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data });
      }
    }).catch(console.log)
  }

  onFormChange = (e) => {
    switch(e.target.name) {
      case 'user-name':
        this.setState({name: e.target.value})
        break;
      default:
        return;
    }
  }

  // reset name
  onButtonCancel = () => {
    this.setState({name: this.props.user.name})
  }


  render() {

    const { user } = this.props;
    const { name } = this.state;

    return (

        <article className='center-all'>
          <main>

            <p className="db fw6 lh-copy f4 white b text-shadow">Name:
              <span className="ttu yellow long-text ph2">{name}</span>
            </p>

            <div className="align mv3">
              <p className="db fw6 lh-copy f4 white b mv4 text-shadow">Current Rank:
                <span className="pa1 bg-yellow ba bw2 b--black mh2 ph2">
                  <Rank entries={user.entries} />
                </span>
              </p>
            </div>

            <p className="db fw6 lh-copy f4 white b mv4 text-shadow">Total Images Submitted:
              <span className="ttu yellow ph2">{user.entries}</span>
            </p>
            <p className="db fw6 lh-copy f4 white b mv4 text-shadow">Member Since:
              <span className="ttu yellow ph2">{new Date(user.joined).toLocaleDateString()}</span>
            </p>

          </main>

          <button 
            className="b ph3 pv2 input-reset ba bg-black white grow pointer f6 dib hover-bg-yellow ttu shadow-1"
            onClick={()=>{this.setState({editToggle:!this.state.editToggle})}}
          >
            Edit Name ?
          </button>
          

          {this.state.editToggle ?  
          (// show
          <div className="edit-div">
         
              
            <input 
              onChange={this.onFormChange} 
              type='text' 
              name='user-name' 
              className='pa2 input-reset ba bg-white hover-bg-black hover-white w-100 mv3 f5 input-profile' 
              value={name}
              placeholder={name}
            >
            </input>

            <div className='mt3'>
              <button
                className='b ph3 pv2 mh3 input-reset ba bg-black white grow pointer f6 dib hover-bg-yellow ttu shadow-1'
                onClick={() => this.onButtonUpdate({name})}
              >
                Update
              </button>
              <button 
                className='b ph3 pv2 mh3 input-reset ba bg-red white grow pointer f6 dib hover-bg-yellow ttu shadow-1'
                onClick={() => this.onButtonCancel({name})}
              >
                Reset
              </button>
            </div>

            
          </div>
          )
            : 
          ''
          // hide
          }

        </article>
    );

  }

}

export default Profile;