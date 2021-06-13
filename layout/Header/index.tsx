import React from 'react';
import cn from 'classnames';

import {HeaderProps} from './types';

import classes from './Header.module.css';

const Header: React.FC<HeaderProps> = ({className, ...props}) => {
  return (
    <header className={cn(classes.header, className)} {...props}>
      Header
    </header>
  );
};

export default Header;
