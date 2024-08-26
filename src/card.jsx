import React from 'react';
const Card = ({ title, date, image, description }) => {
    return (
      <div className='card'>
        {image && <img className="card-image" src={image} alt={title} />}
        <div >
          <h3 className='card-title'>{title}</h3>
          <p className='card-date'>{date}</p>
          <p className='card-desc'>{description}</p>
        </div>
      </div>
    );
};

export default Card;