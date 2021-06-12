import React from 'react';
import Rank from '../components/Rank';

const ImageLinkForm = ({ input, onInputChange, onSubmitImage, errors, status, name, entries }) => {

  return (
    <>
    
      <main className='text-shadow'>

        <p className="db fw6 lh-copy f3 white b">Hi
          <span className="underline ttu yellow long-text ph2">{name}</span>
          <span className=""><Rank entries={entries} /></span>
        </p>

        <h2 className='db fw6 lh-copy f4 black b i ttc mv4'>
          Paste an image link below to find faces in your images!
        </h2>
      
      </main>


      <div className='form pa3 shadow-5 ba bw0 b--black'>

          <input 
            id="imageupload" 
            className={`pa2 input-reset ba bg-white hover-bg-black hover-white f4${errors && ' ba bw2 b--red'}`} 
            type='search' 
            placeholder='paste image link here' 
            onChange={onInputChange} 
            value={input} 
          />
          <button
            className='b ph3 pv2 input-reset ba bg-purple white grow pointer f4 dib hover-bg-yellow ttu'
            onClick={onSubmitImage}
          >Detect</button>
      
      </div>
      
      { errors && <p className='error tc bg-red white ma4 pa2 f5 ttc shadow-1'>{`${errors}`}</p> }
      { status && <p className='status tc bg-yellow black ma4 pa2 f5 ttc shadow-1'>{`${status}`}</p> }

    </>
  );
  
}

export default ImageLinkForm;