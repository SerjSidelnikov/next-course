import React from 'react';
import axios from 'axios';

import { withLayout } from '../../layout';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { IMenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../utils/helper';
import { ParsedUrlQuery } from 'querystring';
import { TopPageModel } from '../../interfaces/topPage.interface';
import { ProductModel } from '../../interfaces/product.interface';

const Type: React.FC = () => {
  return <div>Type</div>;
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => `/${m.route}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
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

    return {
      props: {
        firstCategory: firstCategoryItem.id,
        menu,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
