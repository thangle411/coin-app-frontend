import React, { CSSProperties, FC } from 'react';
import './FeatureContainer.scss';

interface FeatureContainerProps {
  title: string;
  children: React.ReactNode;
  style?: CSSProperties;
  childrenStyle?: CSSProperties;
}

const FeatureContainer: FC<FeatureContainerProps> = ({ title, style, childrenStyle, children }) => {
  return (
    <div className='feature-container' style={style}>
      <div className='feature-container-title'>{title}</div>
      <div className='feature-container-children' style={childrenStyle}>
        {' '}
        {children}
      </div>
    </div>
  );
};

export default FeatureContainer;
