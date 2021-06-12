import React, { Component } from 'react';
import Rank from '../components/Rank';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name,
      editToggle: false // hide on load
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
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data });
      }
    }).catch(console.log)
  }

  onFormChange = (event) => {
    switch(event.target.name) {
      case 'user-name':
        this.setState({name: event.target.value})
        break;
      default:
        return;
    }
  }

  onButtonCancel = (event) => {
    this.setState({name: this.props.user.name})
  }

  onEditToggle = () => {
    // show/hide div
    // class=edit-div
    //alert('test')

    //toggle
    //editName false/true
  }


  render() {

    const { user } = this.props
    const { name, entries } = this.state;

    return (
        <article className='center bg-transparent'>

          <main className=''>
            <p className="db fw6 lh-copy f4 white b text2">Name:
              <span className="ttu yellow name-value ph2">{name}</span>
            </p>
            <div className="align mv3 center">
              <p className="db fw6 lh-copy f4 white b mv3 text2">Current Rank:
                <span className="pa1 bg-yellow ba bw2 b--black mh2 ph2">
                  <Rank entries={user.entries} />
                </span>
              </p>
            </div>
            <p className="db fw6 lh-copy f4 white center b mv3 text2">Total Images Submitted:
              <span className="ttu yellow ph2">{user.entries}</span>
            </p>
            <p className="db fw6 lh-copy f4 white center b mv4 text2">Member Since:
              <span className="ttu yellow ph2">{new Date(user.joined).toLocaleDateString()}</span>
            </p>
           
            <button 
              className="b ph3 pv2 mv3 input-reset ba bg-black white grow pointer f6 dib center hover-bg-yellow ttu shadow-1"
              onClick={()=>{this.setState({editToggle:!this.state.editToggle})}}
            >
              Edit Name ?
            </button>
          
            {this.state.editToggle ?  
            (
            <div className="edit-div">
            <hr />
              <input 
                onChange={this.onFormChange} 
                type='text' name='user-name' 
                className='pa2 ba w-100' 
                value={name}
                placeholder={name}
              >
              </input>
              <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <button 
                  className='b ph3 pv2 input-reset ba bg-black white grow pointer f6 dib hover-bg-yellow ttu shadow-1'
                  onClick={() => this.onButtonUpdate({name})}
                >
                  Update
                </button>
                <button 
                  className='b ph3 pv2 input-reset ba bg-red white grow pointer f6 dib hover-bg-yellow ttu shadow-1'
                  onClick={() => this.onButtonCancel({name})}
                >
                  Reset
                </button>
              </div>
            </div>
            )
              : 
              
            ''
          }


          </main>

        </article>
    );
  }
}

export default Profile;