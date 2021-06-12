import React from 'react';
import Rank from '../components/Rank';


const ImageLinkForm = ({ input, onInputChange, onSubmitImage, errors, status, name, entries }) => {

  return (
    <>
    
      <main className='text2'>

        <p className="db fw6 lh-copy f3 white b">Hi
          <span className="underline ttu yellow name-value ph2">{name}</span>
          <span className=""><Rank entries={entries} /></span>
        </p>

        <p className='db fw6 lh-copy f4 black b i ttc mv4 center'>
          Paste an image link below to find faces in your images!
        </p>
      
      </main>


      <div className='center'>
        <div className='form center pa3 shadow-5 ba bw0 b--black'>
          <input 
            id="imageupload" 
            className={`f4 ttc pa2 w-100 center${errors && ' ba bw2 b--red'}`} 
            type='search' 
            placeholder='paste image link here' 
            onChange={onInputChange} 
            value={input} 
          />
          <button
            className='b ph3 pv2 input-reset ba bg-purple white grow pointer f6 dib hover-bg-yellow ttu'
            onClick={onSubmitImage}
          >Detect</button>
        </div>
      </div>

      { errors && <p className='error center bg-red white ma4 pa2 f5 ttc shadow-1'>{`${errors}`}</p> }
      { status && <p className='status center bg-yellow black ma4 pa2 f5 ttc shadow-1'>{`${status}`}</p> }

    </>
  );
  
}

export default ImageLinkForm;