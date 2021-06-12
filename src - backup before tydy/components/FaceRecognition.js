import React from 'react';


const FaceRecognition = ({ imageUrl, boxes, errors }) => {
  return (

    <div className='center'>

      <div className='relative'>
      <img 
        id='inputimage'
        alt='' 
        src={imageUrl} 
        width='500px' 
        height='auto' 
        className={`b--solid bg-white ${errors ? 'red' : 'yellow'} shadow-5 `}
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

    </div>

  );
}

export default FaceRecognition;