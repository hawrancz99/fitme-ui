// eslint-disable-next-line import/named
import {
  TRAINER_EVENT_ADDED,
  TRAINER_EVENT_UPDATED,
  TRAINER_EVENTS_DELETED,
  TRAINER_LOADED,
  TRAINER_PHOTO_ADDED,
  TRAINER_PHOTO_DELETED,
  TRAINER_REVIEW_ADDED,
  TRAINER_SPORTS_TYPE_CHANGED,
} from "../../consts";

// eslint-disable-next-line import/prefer-default-export
export const fireTrainerLoaded = (trainer) => ({
  type: TRAINER_LOADED,
  trainer,
});

export const fireTrainerSportTypesChanged = (sportType) => ({
  type: TRAINER_SPORTS_TYPE_CHANGED,
  sportType,
});

export const fireTrainerPhotoAdded = (link) => ({
  type: TRAINER_PHOTO_ADDED,
  link,
});

export const fireTrainerPhotoDeleted = (link) => ({
  type: TRAINER_PHOTO_DELETED,
  link,
});

export const fireTrainerEventsDeleted = (ids) => ({
  type: TRAINER_EVENTS_DELETED,
  ids,
});

export const fireTrainerEventAdded = (event) => ({
  type: TRAINER_EVENT_ADDED,
  event,
});

export const fireTrainerEventsUpdated = (events) => ({
  type: TRAINER_EVENT_UPDATED,
  events,
});

export const fireTrainerReviewAdded = (review) => ({
  type: TRAINER_REVIEW_ADDED,
  review,
});
