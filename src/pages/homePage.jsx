import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import HomePageTemplate from '../templates/homePageTemplate';
import { FILTER_QUERY } from '../graphql/graphql';
import { fireFilterDataLoaded, fireResetFilter } from '../actions/filter/filterActions';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';
import { afterApolloCallAction } from '../actions/common';

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useSelector((state) => state.filterReducer.location?.formatted_address);

  const [filterFetcher, { loading }] = useLazyQuery(FILTER_QUERY, {
    onCompleted: ({ filter }) => {
      dispatch(fireResetFilter());
      dispatch(fireFilterDataLoaded(filter.sportsGrounds));
      history.push('/search');
      dispatch(fireTriggerBackdrop(false));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Vyhledávání selhalo'));
    },
  });

  const search = () => {
    filterFetcher({
      variables: { filterRequest: { location, sportTypes: [], filterBy: "sportsGrounds" } },
    });
  };

  useEffect(() => {
    if (loading === true) {
      dispatch(fireTriggerBackdrop(true));
    }
  }, [loading, dispatch]);

  return (
    <HomePageTemplate
      location={location}
      search={search}
    />
  );
}

export default HomePage;
