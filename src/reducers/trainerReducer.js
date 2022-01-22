import {
  TRAINER_EVENT_ADDED,
  TRAINER_EVENT_UPDATED,
  TRAINER_EVENTS_DELETED,
  TRAINER_LOADED,
  TRAINER_PHOTO_ADDED,
  TRAINER_PHOTO_DELETED,
  TRAINER_REVIEW_ADDED,
  TRAINER_SPORTS_TYPE_CHANGED,
} from "../consts";
import { removeTypeName } from "../utils/utils";

const initialState = {
  trainer: {},
};

const TrainerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TRAINER_LOADED:
      const { trainer } = action;
      let finalObject = trainer;
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (trainer?.sportTypes) {
        finalObject = {
          ...finalObject,
          sportTypes: [
            ...trainer?.sportTypes?.map((st) => {
              return { ...removeTypeName(st) };
            }),
          ],
        };
      }
      if (trainer?.events) {
        finalObject = {
          ...finalObject,
          events: [
            ...trainer?.events?.map((e) => {
              return {
                ...removeTypeName(e),
                sportType: removeTypeName(e.sportType),
              };
            }),
          ],
        };
      }
      return { ...state, trainer: finalObject };
    case TRAINER_SPORTS_TYPE_CHANGED: {
      let newState;
      if (
        state.trainer.sportTypes.some((st) => st.id === action.sportType.id)
      ) {
        newState = {
          ...state,
          trainer: {
            ...state.trainer,
            sportTypes: [
              ...state.trainer.sportTypes.filter(
                (st) => st.id !== action.sportType.id
              ),
            ],
          },
        };
      } else {
        newState = {
          ...state,
          trainer: {
            ...state.trainer,
            sportTypes: [...state.trainer.sportTypes, action.sportType],
          },
        };
      }
      return newState;
    }
    case TRAINER_PHOTO_ADDED: {
      return {
        ...state,
        trainer: {
          ...state.trainer,
          images: [...state.trainer.images, action.link],
        },
      };
    }
    case TRAINER_REVIEW_ADDED: {
      return {
        ...state,
        trainer: {
          ...state.trainer,
          reviews: [...state.trainer.reviews, action.review],
        },
      };
    }
    case TRAINER_PHOTO_DELETED: {
      return {
        ...state,
        trainer: {
          ...state.trainer,
          images: [...state.trainer.images.filter((i) => i !== action.link)],
        },
      };
    }
    case TRAINER_EVENTS_DELETED: {
      return {
        ...state,
        trainer: {
          ...state.trainer,
          events: [
            ...state.trainer.events.filter((e) => !action.ids.includes(e.id)),
          ],
        },
      };
    }
    case TRAINER_EVENT_ADDED: {
      return {
        ...state,
        trainer: {
          ...state.trainer,
          events: [...state.trainer.events, action.event],
        },
      };
    }
    case TRAINER_EVENT_UPDATED: {
      return {
        ...state,
        trainer: {
          ...state.trainer,
          events: action.events,
        },
      };
    }
    default:
      return state;
  }
};

export default TrainerReducer;
