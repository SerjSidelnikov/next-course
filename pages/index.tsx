import React from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import Button from '../components/Button';
import Htag from '../components/Htag';
import P from '../components/P';
import Tag from '../components/Tag';
import Rating from '../components/Rating';
import { withLayout } from '../layout';
import { IMenuItem } from '../interfaces/menu.interface';

interface HomeProps extends Record<string, unknown> {
  menu: IMenuItem[];
  firstCategory: number;
}

function Home(): JSX.Element {
  const [rating, setRating] = React.useState<number>(4);

  return (
    <>
      <Htag tag="h1">Title</Htag>
      <Button appearance="primary" type="button" arrow="right">
        Button
      </Button>
      <Button appearance="ghost" type="button" arrow="down">
        Button two
      </Button>

      <P>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores illum ducimus pariatur
        alias consequatur veritatis, soluta et est laboriosam unde, quibusdam ab commodi a explicabo
        placeat necessitatibus aliquam recusandae qui!
      </P>

      <P size="s">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores illum ducimus pariatur
        alias consequatur veritatis, soluta et est laboriosam unde, quibusdam ab commodi a explicabo
        placeat necessitatibus aliquam recusandae qui!
      </P>

      <P size="l">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores illum ducimus pariatur
        alias consequatur veritatis, soluta et est laboriosam unde, quibusdam ab commodi a explicabo
        placeat necessitatibus aliquam recusandae qui!
      </P>

      <p>
        <Tag size="s" href="/photoshop" target="_blank">
          Photoshop
        </Tag>
        <Tag size="s" color="green">
          -10 000 ₽
        </Tag>
        <Tag color="grey">10</Tag>
        <Tag color="red">hh.ru</Tag>
        <Tag color="primary" size="s">
          Работа в Photoshop
        </Tag>
      </p>

      <div>
        <Rating rating={rating} onRating={setRating} isEditable />
      </div>
      <div>
        <Rating rating={3} />
      </div>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<IMenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory },
  );

  return {
    props: {
      firstCategory,
      menu,
    },
  };
};
