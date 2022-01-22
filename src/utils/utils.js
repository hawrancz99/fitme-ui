import { USER_TYPES } from "../consts";

export function removeTypeName({ __typename, ...element }) {
  return { ...element };
}

export function removeChecked({ checked, ...element }) {
  return { ...element };
}

export function doMagicWithUser({ sportsGrounds, trainer, ...user }) {
  return { ...user };
}

export function getAvgRating(ratings) {
  if (!ratings) {
    return;
  }
  let ratingsTogether = 0;
  ratings.forEach((r) => (ratingsTogether += r.value));
  return ratingsTogether === 0
    ? ratingsTogether
    : Math.floor(ratingsTogether / ratings.length);
}

export const resolveUserId = (user) => {
  if (user && USER_TYPES.USER === user.accountType) {
    return user.id;
  }
  return null;
};
