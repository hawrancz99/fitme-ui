import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageWrapper from './pageWrapper';
import { AuthProvider } from './utils/auth';
import EnhancedApolloProvider from './utils/apollo';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EnhancedApolloProvider>
          <PageWrapper />
        </EnhancedApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
