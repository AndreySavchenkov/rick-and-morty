import { Routes, Route } from 'react-router-dom';
import { Characters, Layout } from 'components';

function App() {

  return (
    <>
      <Routes>
        <Route path='/rick-and-morty' element={<Layout />}>
          <Route index element={<Characters />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
