import Button from '../components/Button';
import Htag from '../components/Htag';
import P from '../components/P';

export default function Home(): JSX.Element {
  return (
    <div style={{ padding: 20 }}>
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
    </div>
  );
}
