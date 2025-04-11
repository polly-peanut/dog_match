import { render, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  const mockProps = {
    id: 1,
    image: 'test-image.jpg',
    isFlipped: false,
    isMatched: false,
    onClick: vi.fn(),
  };

  it('renders correctly', () => {
    const { container } = render(<Card {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const { container } = render(<Card {...mockProps} />);
    fireEvent.click(container.firstChild!);
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it('shows question marks when not flipped', () => {
    const { container } = render(<Card {...mockProps} />);
    expect(container.textContent).toContain('??');
  });

  it('shows image when flipped', () => {
    const { container } = render(<Card {...mockProps} isFlipped={true} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.src).toContain('test-image.jpg');
  });
});