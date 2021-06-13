import React from 'react';
import cn from 'classnames';

import { FooterProps } from './types';

import classes from './Footer.module.css';

const Footer: React.FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer className={cn(classes.footer, className)} {...props}>
      <p>OwlTop &copy; 2020 - {new Date().getFullYear()} Все права защищены</p>

      <a href="#" target="_blank">
        Пользовательское соглашение
      </a>
      <a href="#" target="_blank">
        Политика конфиденциальности
      </a>
    </footer>
  );
};

export default Footer;
