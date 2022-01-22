import {
  SPORTS_GROUND_EVENT_ADDED,
  SPORTS_GROUND_EVENT_UPDATED,
  SPORTS_GROUND_EVENTS_DELETED,
  SPORTS_GROUND_LOADED,
  SPORTS_GROUND_PHOTO_ADDED,
  SPORTS_GROUND_PHOTO_DELETED,
  SPORTS_GROUND_REVIEW_ADDED,
  SPORTS_GROUND_SPORTS_TYPE_CHANGED,
} from "../../consts";

export const sportsGroundLoaded = (sportsGround) => ({
  type: SPORTS_GROUND_LOADED,
  sportsGround,
});

export const fireSportsGroundSportTypesChanged = (sportType) => ({
  type: SPORTS_GROUND_SPORTS_TYPE_CHANGED,
  sportType,
});

export const fireSportsGroundPhotoAdded = (link) => ({
  type: SPORTS_GROUND_PHOTO_ADDED,
  link,
});

export const fireSportsGroundPhotoDeleted = (link) => ({
  type: SPORTS_GROUND_PHOTO_DELETED,
  link,
});

export const fireSportsGroundEventsDeleted = (ids) => ({
  type: SPORTS_GROUND_EVENTS_DELETED,
  ids,
});

export const fireSportsGroundEventAdded = (event) => ({
  type: SPORTS_GROUND_EVENT_ADDED,
  event,
});

export const fireSportsGroundEventsUpdated = (events) => ({
  type: SPORTS_GROUND_EVENT_UPDATED,
  events,
});

export const fireSportsGroundReviewAdded = (review) => ({
  type: SPORTS_GROUND_REVIEW_ADDED,
  review,
});
