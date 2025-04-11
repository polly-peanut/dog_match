import React, { useState, useEffect } from 'react';
import Card from './Card';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Initialize with placeholder images - replace with actual dog images
    const initialCards: Card[] = [
      { id: 1, image: 'dog1.jpg', isFlipped: false, isMatched: false },
      { id: 2, image: 'dog1.jpg', isFlipped: false, isMatched: false },
      { id: 3, image: 'dog2.jpg', isFlipped: false, isMatched: false },
      { id: 4, image: 'dog2.jpg', isFlipped: false, isMatched: false },
      // Add more pairs as needed
    ];

    // Shuffle the cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const handleCardClick = (clickedCardId: number) => {
    const clickedCard = cards.find(card => card.id === clickedCardId);
    
    if (!clickedCard || clickedCard.isMatched || flippedCards.length === 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCardId];
    setFlippedCards(newFlippedCards);

    const updatedCards = cards.map(card =>
      card.id === clickedCardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    if (newFlippedCards.length === 2) {
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (newFlippedCards: number[]) => {
    const [firstCardId, secondCardId] = newFlippedCards;
    const firstCard = cards.find(card => card.id === firstCardId);
    const secondCard = cards.find(card => card.id === secondCardId);

    if (firstCard && secondCard && firstCard.image === secondCard.image) {
      // Match found
      const updatedCards = cards.map(card =>
        card.id === firstCardId || card.id === secondCardId
          ? { ...card, isMatched: true }
          : card
      );
      setCards(updatedCards);
      setMatchedPairs(prev => prev + 1);
      setFlippedCards([]);
    } else {
      // No match
      setTimeout(() => {
        const updatedCards = cards.map(card =>
          card.id === firstCardId || card.id === secondCardId
            ? { ...card, isFlipped: false }
            : card
        );
        setCards(updatedCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          image={card.image}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default GameBoard;