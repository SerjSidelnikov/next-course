import Button from '../components/Button';
import Htag from '../components/Htag';

export default function Home(): JSX.Element {
  return (
    <div style={{   padding: 20   }}>
      <Htag tag="h1">Title</Htag>
      <Button appearance="primary" type="button" arrow="right">Button</Button>
      <Button appearance="ghost" type="button" arrow="down">Button two</Button>
    </div>
  );
}
