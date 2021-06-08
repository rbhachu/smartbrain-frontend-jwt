import React from 'react';


const ImageLinkForm = ({ input, onInputChange, onSubmitImage, errors, status }) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      
       { errors && <p className='f4 red b'>{`${errors}`}</p> }
       { status && <p className='f4 yellow b'>{`${status}`}</p> }

      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input id="imageupload" className={`f4 pa2 w-70 center${errors && ' error'}`} type='search' placeholder='paste image link here' onChange={onInputChange} value={input} />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onSubmitImage}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;