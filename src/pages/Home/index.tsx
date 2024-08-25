import Tabs from '@/components/Tabs';
import { categories } from '@/utilities/constants';

const Home = () => {
  return (
    <>
      <Tabs initialTabs={categories} storageKey="category" />
    </>
  );
};

export default Home;
