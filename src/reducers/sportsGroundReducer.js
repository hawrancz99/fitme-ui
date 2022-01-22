import {
  SPORTS_GROUND_EVENT_ADDED,
  SPORTS_GROUND_EVENT_UPDATED,
  SPORTS_GROUND_EVENTS_DELETED,
  SPORTS_GROUND_LOADED,
  SPORTS_GROUND_PHOTO_ADDED,
  SPORTS_GROUND_PHOTO_DELETED,
  SPORTS_GROUND_REVIEW_ADDED,
  SPORTS_GROUND_SPORTS_TYPE_CHANGED,
} from "../consts";
import { removeTypeName } from "../utils/utils";

const initialState = {
  mySportsGround: null,
};

const SportsGroundReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SPORTS_GROUND_LOADED: {
      const { sportsGround } = action;
      let finalObject = sportsGround;
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (sportsGround?.sportTypes) {
        finalObject = {
          ...finalObject,
          sportTypes: [
            ...sportsGround?.sportTypes?.map((st) => {
              return { ...removeTypeName(st) };
            }),
          ],
        };
      }
      if (sportsGround?.events) {
        finalObject = {
          ...finalObject,
          events: [
            ...sportsGround?.events?.map((e) => {
              return {
                ...removeTypeName(e),
                sportType: removeTypeName(e.sportType),
              };
            }),
          ],
        };
      }
      return {
        ...state,
        mySportsGround: finalObject,
      };
    }
    case SPORTS_GROUND_SPORTS_TYPE_CHANGED: {
      let newState;
      if (
        state.mySportsGround.sportTypes.some(
          (st) => st.id === action.sportType.id
        )
      ) {
        newState = {
          ...state,
          mySportsGround: {
            ...state.mySportsGround,
            sportTypes: [
              ...state.mySportsGround.sportTypes.filter(
                (st) => st.id !== action.sportType.id
              ),
            ],
          },
        };
      } else {
        newState = {
          ...state,
          mySportsGround: {
            ...state.mySportsGround,
            sportTypes: [...state.mySportsGround.sportTypes, action.sportType],
          },
        };
      }
      return newState;
    }
    case SPORTS_GROUND_PHOTO_ADDED: {
      return {
        ...state,
        mySportsGround: {
          ...state.mySportsGround,
          images: [...state.mySportsGround.images, action.link],
        },
      };
    }
    case SPORTS_GROUND_REVIEW_ADDED: {
      return {
        ...state,
        mySportsGround: {
          ...state.mySportsGround,
          reviews: [...state.mySportsGround.reviews, action.review],
        },
      };
    }
    case SPORTS_GROUND_PHOTO_DELETED: {
      return {
        ...state,
        mySportsGround: {
          ...state.mySportsGround,
          images: [
            ...state.mySportsGround.images.filter((i) => i !== action.link),
          ],
        },
      };
    }
    case SPORTS_GROUND_EVENTS_DELETED: {
      return {
        ...state,
        mySportsGround: {
          ...state.mySportsGround,
          events: [
            ...state.mySportsGround.events.filter(
              (e) => !action.ids.includes(e.id)
            ),
          ],
        },
      };
    }
    case SPORTS_GROUND_EVENT_ADDED: {
      return {
        ...state,
        mySportsGround: {
          ...state.mySportsGround,
          events: [...state.mySportsGround.events, action.event],
        },
      };
    }
    case SPORTS_GROUND_EVENT_UPDATED: {
      return {
        ...state,
        mySportsGround: {
          ...state.mySportsGround,
          events: action.events,
        },
      };
    }
    default:
      return state;
  }
};

export default SportsGroundReducer;
