import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MUIProvider } from './lib/mui';
import { SnackbarProvider } from './lib/notistack';
import { ReactQueryProvider } from './lib/react-query';
import routes from './routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <MUIProvider>
      <ReactQueryProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ReactQueryProvider>
    </MUIProvider>
  );
}

export default App;
