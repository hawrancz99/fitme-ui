import { gql } from "@apollo/client";

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    value
    text
  }
`;

export const SPORT_TYPE_FIELDS = gql`
  fragment SportTypeFields on SportType {
    id
    varName
    name
  }
`;

export const EVENT_FIELDS = gql`
  ${SPORT_TYPE_FIELDS}
  fragment EventFields on Event {
    id
    dateFrom
    dateTo
    name
    fullAddress
    distanceFromUser
    about
    price
    capacity
    sportsGroundId
    trainerId
    price
    userLogged
    totalUsersLogged
    sportType {
      ...SportTypeFields
    }
  }
`;

export const SPORTS_GROUND_FIELDS = gql`
  ${EVENT_FIELDS}
  ${SPORT_TYPE_FIELDS}
  ${REVIEW_FIELDS}
  fragment SportsGroundFields on SportsGround {
    id
    fullAddress
    street
    city
    name
    registrationNumber
    street
    descNumber
    city
    zip
    website
    facebook
    about
    instagram
    images
    email
    phoneNumber
    distanceFromUser
    events {
      ...EventFields
      sportType {
        ...SportTypeFields
      }
    }
    sportTypes {
      ...SportTypeFields
    }
    reviews {
      ...ReviewFields
    }
  }
`;

export const TRAINER_FIELDS = gql`
  ${EVENT_FIELDS}
  ${SPORT_TYPE_FIELDS}
  ${REVIEW_FIELDS}
  fragment TrainerFields on Trainer {
    id
    firstName
    lastName
    phoneNumber
    website
    facebook
    instagram
    images
    email
    about
    street
    descNumber
    city
    zip
    fullAddress
    distanceFromUser
    events {
      ...EventFields
      sportType {
        ...SportTypeFields
      }
    }
    sportTypes {
      ...SportTypeFields
    }
    reviews {
      ...ReviewFields
    }
  }
`;

export const USER_FIELDS = gql`
  ${REVIEW_FIELDS}
  fragment UserFields on User {
    id
    accountType
    email
    firstName
    lastName
    phoneNumber
    reviews {
      ...ReviewFields
    }
  }
`;
