import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ApolloClient, ApolloLink, ApolloProvider, from, InMemoryCache, } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { createUploadLink } from 'apollo-upload-client';
import { useAuth } from './auth';
import config from '../config';

const UNAUTHENTICATED_CODE = 'UNAUTHENTICATED';

const hasUnauthenticatedErrorCode = (errors) => (
  errors
    && errors.some((error) => error.extensions.code === UNAUTHENTICATED_CODE)
);

const hasNetworkStatusCode = (error, code) => error && error.statusCode === code;

function EnhancedApolloProvider({ children }) {
  const history = useHistory();
  const { token, signout } = useAuth();

  const handleSignOut = useCallback(() => {
    signout();
    window.location.reload();
  }, [signout, history]);

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return forward(operation);
  });

  const uploadLink = createUploadLink({
    uri: config.GRAPHQL_API,
  });

  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (
      hasUnauthenticatedErrorCode(graphQLErrors)
      || hasNetworkStatusCode(networkError, 401)
    ) {
      handleSignOut();
    }
  });

  const client = new ApolloClient({
    link: from([logoutLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default EnhancedApolloProvider;
