import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Game, NotFound } from './pages';
import { GITHUB_REPO_NAME } from './consts';

const router = createBrowserRouter([
  {
    path: `/${GITHUB_REPO_NAME}`,
    element: <Home />,
  },
  {
    path: `/${GITHUB_REPO_NAME}/:name`,
    element: <Game />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
