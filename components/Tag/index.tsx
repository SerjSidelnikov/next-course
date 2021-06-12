import React from 'react';
import cn from 'classnames';

import { TagProps } from './types';

import classes from './Tag.module.css';

const Tag: React.FC<TagProps> = ({
  children,
  className,
  size = 's',
  href,
  color = 'ghost',
  ...props
}) => {
  const Component = href ? 'a' : 'span';

  return (
    <Component
      className={cn(classes.tag, className, {
        [classes.m]: size === 'm',
        [classes.s]: size === 's',
        [classes.ghost]: color === 'ghost',
        [classes.red]: color === 'red',
        [classes.grey]: color === 'grey',
        [classes.green]: color === 'green',
        [classes.primary]: color === 'primary',
      })}
      href={href}
      {...props}>
      {children}
    </Component>
  );
};

export default Tag;
