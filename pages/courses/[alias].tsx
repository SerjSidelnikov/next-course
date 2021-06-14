import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

import { withLayout } from '../../layout';
import { IMenuItem } from '../../interfaces/menu.interface';
import { TopPageModel } from '../../interfaces/topPage.interface';
import { ProductModel } from '../../interfaces/product.interface';
import Htag from '../../components/Htag';

interface CourseProps extends Record<string, unknown> {
  menu: IMenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}

const firstCategory = 0;

const Course: React.FC<CourseProps> = ({ menu, page, products }) => {
  return (
    <>
      <Htag tag="h1">Courses</Htag>
      <p>{products.length}</p>
    </>
  );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<IMenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory },
  );

  return {
    paths: menu.flatMap((m) => m.pages.map((p) => `/courses/${p.alias}`)),
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

  const { data: menu } = await axios.post<IMenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory },
  );

  const { data: page } = await axios.get<TopPageModel>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`,
  );

  const { data: products } = await axios.post<ProductModel[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
    { category: page.category, limit: 10 },
  );

  return {
    props: {
      firstCategory,
      menu,
      page,
      products,
    },
  };
};
