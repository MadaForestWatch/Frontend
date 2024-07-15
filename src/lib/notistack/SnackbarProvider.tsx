import { PropsWithChildren } from 'react';

import { SnackbarProvider as LibSnackbarProvider } from 'notistack';

function SnackbarProvider({ children }: PropsWithChildren) {
  return (
    <LibSnackbarProvider
      maxSnack={3}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {children}
    </LibSnackbarProvider>
  );
}

export default SnackbarProvider;
