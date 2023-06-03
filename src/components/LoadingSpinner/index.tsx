import React from 'react';
import spinner from '../../assets/images/spinner.svg';
import './LoadingSpinner.scss';

export default function LoadingSpinner() {
  return <img className='loading-spinner-image' src={spinner} alt='' />;
}
