import React from 'react';
import cn from 'classnames';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, IPageItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/topPage.interface';

import classes from './Menu.module.css';

const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

const Menu: React.FC = () => {
  const { menu, firstCategory, setMenu } = React.useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <ul className={cn(classes.list, classes.firstList)}>
        {firstLevelMenu.map((m) => (
          <li key={m.route}>
            <a
              href={`/${m.route}`}
              className={cn(classes.link, classes.firstLink, {
                [classes.active]: m.id === firstCategory,
              })}>
              {m.icon}
              <span>{m.name}</span>
            </a>

            {m.id === firstCategory && buildSecondLevel(m.route, m.id === firstCategory)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (route: string, isOpened: boolean) => {
    return (
      <ul className={cn(classes.list, classes.secondList, { [classes.open]: isOpened })}>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>
            <span className={classes.secondLink}>{m._id.secondCategory}</span>
            {buildThirdLevel(m.pages, route)}
          </li>
        ))}
      </ul>
    );
  };

  const buildThirdLevel = (pages: IPageItem[], route: string) => {
    return (
      <ul className={cn(classes.list, classes.thirdList)}>
        {pages.map((p) => (
          <li key={p._id}>
            <a href={`/${route}/${p.alias}`} className={classes.thirdLink}>
              {p.category}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return buildFirstLevel();
};

export default Menu;
