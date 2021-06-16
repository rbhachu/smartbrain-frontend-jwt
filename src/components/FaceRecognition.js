import React from 'react';
import Loader from '../assets/Preloader.svg' // preloader image for loader

const FaceRecognition = ({ imageUrl, boxes, errors, loading }) => {

  return (

    <div className='center inputimage-div'>

      { loading ? 

        <img className="center" src={Loader} alt="Loading..." title="Loading..." width="100" height="100" /> 

      :

        <div className='relative'>
        <img 
          id='inputimage'
          alt='' 
          src={imageUrl} 
          width='500' 
          height='auto' 
          className={`bg-white shadow-5 b--solid${errors ? ' red' : ' yellow'}`}
        />
        {boxes &&       
          boxes.map(box =>
            <div key={`box${box.topRow}${box.rightCol}`}
                className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
            </div>
          )
        }
        </div>

      }

    </div>

  );
}

export default FaceRecognition;