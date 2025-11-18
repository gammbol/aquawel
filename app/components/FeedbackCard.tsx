import React, {ReactNode} from 'react';

interface CardProps {
  name: string;
  stars: number;
  message: string;
  photoPath: string;
}

const FeedbackCard = ({ name, stars = 5, message = "", photoPath="/logo.jpg" } : CardProps) => {
  const starsArray: ReactNode[] = [];

  for (let i = 1; i <= 5; i++) {
    starsArray.push(
      <div key={i} className="mask mask-star bg-orange-400" aria-label="1 star" aria-checked={i == stars}></div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-sm h-full flex flex-col">
      <figure className="flex-shrink-0">
        <img
          src={photoPath}
          alt="Movie"
          className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body flex flex-col flex-grow">
        <h2 className="card-title text-lg">{name}</h2>
        <div className="rating rating-sm">
          {starsArray}
        </div>
        <p className="flex-grow overflow-hidden text-ellipsis">{message}</p>
        {/*<div className="card-actions justify-end mt-2">*/}
        {/*  <button className="btn btn-primary btn-sm">Подробнее</button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default FeedbackCard;