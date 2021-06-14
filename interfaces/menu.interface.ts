import { TopLevelCategory } from './topPage.interface';

export interface Id {
  secondCategory: string;
}

export interface IPageItem {
  alias: string;
  title: string;
  _id: string;
  category: string;
}

export interface IMenuItem {
  _id: Id;
  pages: IPageItem[];
  isOpened?: boolean;
}

export interface FirstLevelMenuItem {
  route: string;
  name: string;
  icon: JSX.Element;
  id: TopLevelCategory;
}
