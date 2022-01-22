import {
  FILTER_BY_CHANGED,
  FILTER_DATA_LOADED,
  FILTER_LOCATION_LOADED,
  FILTER_PAGE_CHANGED,
  FILTER_SPORT_TYPES_CHECKED,
  FILTER_SPORT_TYPES_LOADED,
  RESET_FILTER,
  SORT_CHANGED,
} from "../../consts";

export const fireFilterDataLoaded = (payload) => ({
  type: FILTER_DATA_LOADED,
  payload,
});

export const fireFilterSportTypesLoaded = (sportTypes) => ({
  type: FILTER_SPORT_TYPES_LOADED,
  sportTypes,
});

export const fireResetFilter = () => ({ type: RESET_FILTER });

export const fireFilterPageChanged = (page) => ({
  type: FILTER_PAGE_CHANGED,
  page,
});

export const fireFilterByChanged = (filterBy) => ({
  type: FILTER_BY_CHANGED,
  filterBy,
});

export const fireLocationLoaded = (location) => ({
  type: FILTER_LOCATION_LOADED,
  location,
});

export const fireFilterSportTypesChecked = (varName) => ({
  type: FILTER_SPORT_TYPES_CHECKED,
  varName,
});

export const fireSortChanged = (sortBy) => ({ type: SORT_CHANGED, sortBy });
