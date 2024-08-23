import Container from '../../components/Container';
import Tabs from '../../components/Tabs';
import { categories } from '../../utilities/constants';

const Home = () => {
  return (
    <>
      <Tabs tabs={categories} storageKey="category" />
      <Container />
    </>
  );
};

export default Home;
