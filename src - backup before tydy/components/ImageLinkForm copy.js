//import React from 'react';
import React, { Component } from 'react';
import Rank from '../components/Rank';

//const ImageLinkForm = ({ input, onInputChange, onSubmitImage, errors, status, name, entries }) => {
class ImageLinkForm extends Component {

  // set status and errors to empty on load?
  // state?
  constructor(props) {
    super(props)
    this.state = {
      errors: this.props.errors, 
      status: this.props.status,
      input: this.props.input,
    }
  }

  render() {
  console.log(`errorsA: ${this.state.errors}`)
  console.log(`statusA: ${this.state.status}`)
  console.log(`inputA: ${this.state.input}`)

    return (

      <>

        <p className="db fw6 lh-copy f3 white center user-text">
          Hi&nbsp;<span className="underline ttu yellow">{this.name}</span>&nbsp;<Rank entries={this.entries} />
        </p>

        <p className='fw6 f5 black center i mv4'>
          Paste an image link below to find faces in your images!
        </p>

        <div className='center'>
          <div className='form center pa3 shadow-5'>
            <input 
              id="imageupload" 
              className={`f4 pa2 w-100 center${this.errors && ' ba bw2 b--red'}`} 
              type='search' 
              placeholder='paste image link here' 
              onChange={this.onInputChange} 
              value={this.input} 
            />
            <button
              className='b ph3 pv2 input-reset ba bg-purple white grow pointer f6 dib hover-bg-yellow ttu'
              onClick={this.onSubmitImage}
            >Detect</button>
          </div>
        </div>

        { this.errors && <p className='error center bg-red white ma4 pa2'>{`${this.errors}`}</p> }
        { this.status && <p className='status center bg-yellow black ma4 pa2'>{`${this.status}`}</p> }

      </>

    );

  }

}

export default ImageLinkForm;