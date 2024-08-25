import { lazy } from 'react';

const Layout = lazy(() => import('@/pages/Layout'));
const Home = lazy(() => import('@/pages/Home'));

const App = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default App;
