import React from 'react';
import { useData } from '../../Context/DataContext';
import Card from '../Card/Card';

function Main() {
  const values = useData();
  return (
    <Card />
  )
}

export default Main;