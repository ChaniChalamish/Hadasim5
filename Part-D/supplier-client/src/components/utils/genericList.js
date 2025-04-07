import React from 'react';
import { ListGroup } from 'react-bootstrap';

function GenericList({ items }) {
  return (
    <ListGroup>
      {items.map((item, index) => (
        <ListGroup.Item key={index}>{item}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default GenericList;
