import React from 'react';

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ id, image, isFlipped, isMatched, onClick }) => {
  const cardClasses = `
    relative w-24 h-24 cursor-pointer transform transition-transform duration-300
    ${isFlipped ? 'rotate-y-180' : ''}
    ${isMatched ? 'opacity-50' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="absolute w-full h-full bg-blue-500 rounded-lg shadow-md">
        {isFlipped ? (
          <img src={image} alt={`Dog ${id}`} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            ??
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;