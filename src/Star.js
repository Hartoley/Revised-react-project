import React from 'react';

const Star = ({ isSelected, size, color, onClick }) => {
  const starStyles = {
    fontSize: `${size}px`,
    color: color || 'gold',
    cursor: 'pointer',
  };

  return (
    <span
      className={`star ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      style={starStyles}
    >
      ★
    </span>
  );
};

export default Star