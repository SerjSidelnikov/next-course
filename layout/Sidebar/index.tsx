import React from 'react';
import cn from 'classnames';

import {SidebarProps} from './typs';

import classes from './Sidebar.module.css';

const Sidebar: React.FC<SidebarProps> = ({className, ...props}) => {
  return (
    <aside className={cn(classes.sidebar, className)} {...props}>
      Sidebar
    </aside>
  );
};

export default Sidebar;
