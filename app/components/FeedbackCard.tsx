import React, {ReactNode} from 'react';

interface CardProps {
  name: string;
  stars: number;
  message: string;
}

const FeedbackCard = ({ name, stars = 5, message = "" } : CardProps) => {
  const starsArray: ReactNode[] = [];

  for (let i = 1; i <= 5; i++) {
    starsArray.push(
      <div key={i} className="mask mask-star bg-orange-400" aria-label="1 star" aria-checked={i == stars}></div>
    )
  }

  return (
    <div className="card card-side bg-base-100 shadow-sm mx-auto">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="rating">
          {starsArray}
        </div>
        <p>{message}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;