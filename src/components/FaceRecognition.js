import React from 'react';


const FaceRecognition = ({ imageUrl, boxes, errors }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
      <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto' className={`b--solid ${errors ? 'red' : 'yellow'} ma3 shadow-2`}/>

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