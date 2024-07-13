import { Outlet } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

function App() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export default App;
