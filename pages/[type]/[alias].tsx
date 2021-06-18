import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

import { withLayout } from '../../layout';
import { IMenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/topPage.interface';
import { ProductModel } from '../../interfaces/product.interface';
import Htag from '../../components/Htag';
import { firstLevelMenu } from '../../utils/helper';

interface CourseProps extends Record<string, unknown> {
  menu: IMenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

const Course: React.FC<CourseProps> = ({ menu, page, products }) => {
  return (
    <>
      <Htag tag="h1">Courses</Htag>
      <p>{products && products.length}</p>
    </>
  );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<IMenuItem[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
      { firstCategory: m.id },
    );

    paths = paths.concat(menu.flatMap((it) => it.pages.map((p) => `/${m.route}/${p.alias}`)));
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: menu } = await axios.post<IMenuItem[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
      { firstCategory: firstCategoryItem.id },
    );

    if (!menu.length) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`,
    );

    const { data: products } = await axios.post<ProductModel[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
      { category: page.category, limit: 10 },
    );

    return {
      props: {
        firstCategory: firstCategoryItem.id,
        menu,
        page,
        products,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
