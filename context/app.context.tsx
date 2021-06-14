import React from 'react';

import { IMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/topPage.interface';

export interface IAppContext {
  menu: IMenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (menu: IMenuItem[]) => void;
}

export const AppContext = React.createContext<IAppContext>({
  menu: [],
  firstCategory: TopLevelCategory.Courses,
});

export const AppContextProvider: React.FC<IAppContext> = ({ menu, firstCategory, children }) => {
  const [currentMenu, setCurrentMenu] = React.useState<IMenuItem[]>(menu);

  const setMenu = (menu: IMenuItem[]) => {
    setCurrentMenu(menu);
  };

  return (
    <AppContext.Provider value={{ menu: currentMenu, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};
