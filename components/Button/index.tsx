import React from 'react';
import cn from 'classnames';

import ArrowIcon from './arrow.svg';

import { ButtonProps } from './types';

import classes from './Button.module.css';

const Button: React.FC<ButtonProps> = ({
  appearance,
  arrow = 'none',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(classes.button, className, {
        [classes.primary]: appearance === 'primary',
        [classes.ghost]: appearance === 'ghost',
      })}
      {...props}>
      {children}
      {arrow !== 'none' && <ArrowIcon className={cn({ [classes.down]: arrow === 'down' })} />}
    </button>
  );
};

export default Button;
