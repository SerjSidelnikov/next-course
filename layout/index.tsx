import React, { FunctionComponent } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import { LayoutProps } from './types';
import { AppContextProvider, IAppContext } from '../context/app.context';

import classes from './Layout.module.css';

const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <div className={classes.layout} {...props}>
      <Header className={classes.header} />

      <Sidebar className={classes.sidebar} />

      <main className={classes.main}>{children}</main>

      <Footer className={classes.footer} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>,
) => {
  return function withLayoutWrapper(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
