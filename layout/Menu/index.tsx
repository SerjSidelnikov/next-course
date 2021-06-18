import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  const { menu, firstCategory, setMenu } = React.useContext(AppContext);

  const handleClickOpenThirdMenu = (category: string) => () => {
    console.log('click');
    if (setMenu) {
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === category) {
            m.isOpened = !m.isOpened;
          }
          return m;
        }),
      );
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={cn(classes.list, classes.firstList)}>
        {firstLevelMenu.map((m) => (
          <li key={m.route}>
            <Link href={`/${m.route}`}>
              <a
                className={cn(classes.link, classes.firstLink, {
                  [classes.active]: m.id === firstCategory,
                })}>
                {m.icon}
                <span>{m.name}</span>
              </a>
            </Link>

            {m.id === firstCategory && buildSecondLevel(m.route)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (route: string) => {
    return (
      <ul className={cn(classes.list, classes.secondList)}>
        {menu.map((m) => {
          const currentRoute = router.asPath.split('/')[2];
          const isShow = m.pages.map((p) => p.alias).includes(currentRoute) || m.isOpened;

          return (
            <li key={m._id.secondCategory}>
              <span
                className={classes.secondLink}
                onClick={handleClickOpenThirdMenu(m._id.secondCategory)}>
                {m._id.secondCategory}
              </span>
              {isShow && buildThirdLevel(m.pages, route)}
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: IPageItem[], route: string) => {
    return (
      <ul className={cn(classes.list, classes.thirdList)}>
        {pages.map((p) => (
          <li key={p._id}>
            <Link href={`/${route}/${p.alias}`}>
              <a
                className={cn(classes.thirdLink, {
                  [classes.active]: `/${route}/${p.alias}` === router.asPath,
                })}>
                {p.category}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return buildFirstLevel();
};

export default Menu;
