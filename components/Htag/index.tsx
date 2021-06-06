import React from 'react';
import cn from 'classnames';

import { HtagProps } from './types';

import classes from './Htag.module.css';

const Htag: React.FC<HtagProps> = ({ tag, children }) => {
  const Component: 'h1' | 'h2' | 'h3' = tag;

  return (
    <Component
      className={cn({
        [classes.h1]: tag === 'h1',
        [classes.h2]: tag === 'h2',
        [classes.h3]: tag === 'h3',
      })}>
      {children}
    </Component>
  );
};

export default Htag;
