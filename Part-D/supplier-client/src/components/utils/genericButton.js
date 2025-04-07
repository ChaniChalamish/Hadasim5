import React from 'react';
import { Button } from 'react-bootstrap';

function GenericButton({ text, onClick, variant = 'primary' }) {
  return (
    <Button variant={variant} onClick={onClick}>
      {text}
    </Button>
  );
}

export default GenericButton;
