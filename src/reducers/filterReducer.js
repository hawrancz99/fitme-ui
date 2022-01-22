import {
  FILTER_BY_CHANGED,
  FILTER_DATA_LOADED,
  FILTER_LOCATION_LOADED,
  FILTER_PAGE_CHANGED,
  FILTER_SPORT_TYPES_CHECKED,
  FILTER_SPORT_TYPES_LOADED,
  RESET_FILTER,
  SORT_CHANGED,
} from "../consts";
import { getAvgRating } from "../utils/utils";

const prepareDataForPagination = (localData) => {
  const result = [];
  const index = localData.length % 2 === 0 ? 0 : 1;
  for (let i = 0; i <= localData.length + index; i += 2) {
    if (localData[i + 1]) {
      result.push([localData[i], localData[i + 1]]);
    } else if (localData[i]) {
      result.push([localData[i]]);
    }
  }
  return result;
};

const innerSortFn = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

const sortFilterData = (data, sortBy) => {
  const dataInSingleList = [];
  data.forEach((d) => {
    if (Array.isArray(d)) {
      d.forEach((singleD) => dataInSingleList.push(singleD));
    } else {
      dataInSingleList.push(d);
    }
  });

  switch (sortBy) {
    case "distanceClosest":
      dataInSingleList.sort((a, b) => a.distanceFromUser - b.distanceFromUser);
      break;
    case "distanceFurthest":
      dataInSingleList.sort((a, b) => b.distanceFromUser - a.distanceFromUser);
      break;
    case "nameAZ":
      dataInSingleList.sort((a, b) => innerSortFn(a.name, b.name));
      break;
    case "nameZA":
      dataInSingleList.sort((a, b) => innerSortFn(a.name, b.name)).reverse();
      break;
    case "ratingBest":
      dataInSingleList
        .sort((a, b) =>
          innerSortFn(getAvgRating(a.reviews), getAvgRating(b.reviews))
        )
        .reverse();
      break;
    case "ratingWorst":
      dataInSingleList.sort((a, b) =>
        innerSortFn(getAvgRating(a.reviews), getAvgRating(b.reviews))
      );
      break;
    default:
      dataInSingleList.sort((a, b) => innerSortFn(a, b));
  }
  return prepareDataForPagination(dataInSingleList);
};

const initialState = {
  result: [],
  location: "",
  sportTypes: [],
  sortBy: "distanceClosest",
  filterBy: "sportsGrounds",
  currentPage: 1,
};

const FilterReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FILTER_DATA_LOADED: {
      return {
        ...state,
        result: sortFilterData([...action.payload], state.sortBy),
      };
    }
    case FILTER_LOCATION_LOADED: {
      return { ...state, location: action.location };
    }
    case FILTER_SPORT_TYPES_LOADED: {
      return { ...state, sportTypes: action.sportTypes };
    }
    case FILTER_SPORT_TYPES_CHECKED: {
      return {
        ...state,
        sportTypes: [
          ...state.sportTypes.map((st) =>
            st.varName === action.varName ? { ...st, checked: !st.checked } : st
          ),
        ],
      };
    }
    case SORT_CHANGED: {
      return {
        ...state,
        result: sortFilterData([...state.result], action.sortBy),
        sortBy: action.sortBy,
      };
    }
    case FILTER_PAGE_CHANGED: {
      return { ...state, currentPage: action.page };
    }
    case FILTER_BY_CHANGED: {
      return { ...state, filterBy: action.filterBy };
    }
    case RESET_FILTER: {
      return {
        ...initialState,
        location: state.location,
        sportTypes: state.sportTypes.map((st) => ({ ...st, checked: false })),
      };
    }
    default:
      return state;
  }
};

export default FilterReducer;
