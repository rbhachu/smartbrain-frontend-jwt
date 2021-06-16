import React from 'react';
import Rank from '../components/Rank';

const ImageLinkForm = ({ input, onInputChange, onSubmitImage, errors, status, name, entries }) => {

  return (

    <div className='center'>
    
      <main className='text-shadow'>

        <p className="db fw6 lh-copy f3 white b">Hi
          <span className="underline ttu yellow long-text ph2">{name}</span>
          <span className=""><Rank entries={entries} /></span>
        </p>

        <h2 className='db fw6 lh-copy f4 navy b i ttc mv4'>
          Paste an image link below to find faces in your images!
        </h2>
      
      </main>


      <div className='form pa3 shadow-5 ba bw0 b--black center'>

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

      { errors && <p className='error bg-red white pa2 f4 ttc shadow-1 lh-copy center tc ma4'>{`${errors}`}</p> }
      { status && <p className='status bg-yellow black pa2 f4 ttc shadow-1 lh-copy center tc ma4'>{`${status}`}</p> }

    </div>

  );
  
}

export default ImageLinkForm;