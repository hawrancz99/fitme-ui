import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import SearchTemplate from '../templates/searchTemplate/searchTemplate';
import { FILTER_QUERY } from '../graphql/graphql';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';
import { fireFilterDataLoaded, fireFilterPageChanged } from '../actions/filter/filterActions';
import { removeChecked } from '../utils/utils';
import { scrollToTopSinglePage } from '../utils/scrollToTop';
import { afterApolloCallAction } from '../actions/common';

function SearchPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.filterReducer.result);
  const filterBy = useSelector((state) => state.filterReducer.filterBy);
  const location = useSelector((state) => state.filterReducer.location);
  const sportTypes = useSelector((state) => state.filterReducer.sportTypes);
  const currentPage = useSelector((state) => state.filterReducer.currentPage || 1);

  const [filterFetcher, { loading, error }] = useLazyQuery(FILTER_QUERY, {
    onCompleted: ({ filter }) => {
      dispatch(fireFilterDataLoaded(filter[filterBy]));
      dispatch(fireTriggerBackdrop(false));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Filtrování selhalo'));
    },
  });

  const search = () => {
    dispatch(fireFilterPageChanged(1));
    filterFetcher({
      variables: {
        filterRequest: {
          location: location.formatted_address,
          sportTypes: sportTypes.filter((c) => c.checked)
            .map((c) => removeChecked(c)),
          filterBy: filterBy
        },
      },
    });
  };

  useEffect(() => {
    if (loading === true) {
      dispatch(fireTriggerBackdrop(true));
    }
  }, [loading, dispatch]);

  const handleLocationChanged = () => {
    search(sportTypes.filter((c) => c.checked)
      .map((c) => removeChecked(c)));
  };

  const handleChangePage = (e, p) => {
    if (p !== currentPage) {
      scrollToTopSinglePage();
      dispatch(fireFilterPageChanged(p));
    }
  };

  const getDetail = (id, isTrainer) => {
    return isTrainer ? history.push(`/trainer/${id}`) : history.push(`/sports-ground/${id}`);
  };

  return (
    <SearchTemplate
      filterBy={filterBy}
      handleLocationChanged={handleLocationChanged}
      location={location}
      handleRefetch={search}
      error={error}
      sportTypes={sportTypes}
      data={data}
      currentPage={currentPage}
      handleChangePage={handleChangePage}
      getDetail={getDetail}
    />
  );
}

export default SearchPage;
