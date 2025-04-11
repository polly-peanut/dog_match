import { render, fireEvent } from '@testing-library/react';
import GameBoard from '../GameBoard';

describe('GameBoard', () => {
  it('renders correctly', () => {
    const { container } = render(<GameBoard />);
    expect(container).toBeInTheDocument();
  });

  it('initializes with correct number of cards', () => {
    const { container } = render(<GameBoard />);
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBe(4); // Assuming 4 cards in the initial setup
  });

  it('flips card on click', () => {
    const { container } = render(<GameBoard />);
    const firstCard = container.querySelector('.card');
    fireEvent.click(firstCard!);
    expect(firstCard).toHaveClass('rotate-y-180');
  });
});