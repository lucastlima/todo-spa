import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ color }) => color};
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ color }) => (color ? color : 'var(--blue)')};
  margin: 0.5rem;
  border-radius: 0.3rem;
  color: var(--white);
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-shadow: var(--shadow-one);
  transition: transform 0.1s ease-in;

  &:hover {
    transform: scale(1.05);
  }
`;

function Button({ children, color, ...rest }) {
  return (
    <StyledButton color={color} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
