import React, { CSSProperties, FC } from 'react';
import './InputFieldSearchResults.scss';

interface InputFieldSearchResultsProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const InputFieldSearchResults: FC<InputFieldSearchResultsProps> = ({ children, style = {} }) => {
  return (
    <div className='input-field-search-results-container' style={style}>
      {children}
    </div>
  );
};

export default InputFieldSearchResults;
