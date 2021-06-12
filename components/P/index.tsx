import React from 'react';
import cn from 'classnames';

import { PProps } from './types';

import classes from './P.module.css';

const P: React.FC<PProps> = ({ children, size = 'm', className, ...props }) => {
  return (
    <p
      className={cn(classes.p, className, {
        [classes.s]: size === 's',
        [classes.m]: size === 'm',
        [classes.l]: size === 'l',
      })}
      {...props}>
      {children}
    </p>
  );
};

export default P;
