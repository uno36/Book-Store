import {
  createBrowserRouter, RouterProvider, Route, createRoutesFromElements,
} from 'react-router-dom';

import RootLayout from './components/layouts/RootLayout';
import Book from './components/book';
import Categories from './components/categories';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Book />} />
      <Route path="categories" element={<Categories />} />
    </Route>,
  ),
);

function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
