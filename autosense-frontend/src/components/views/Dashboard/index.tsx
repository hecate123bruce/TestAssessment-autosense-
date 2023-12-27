import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <>
    <h1>Test Assesment</h1>
    <div>
      <Link to='/login'>Login</Link>/<Link to='/register'>Register</Link>
    </div>
    </>
  )
}