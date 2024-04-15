import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SOHome() {
    let location = useLocation();
    const so_id = location.state.id;
  return (
    <>
    <div>SOHome</div>
    <div>{so_id}</div>
    </>
  )
}
