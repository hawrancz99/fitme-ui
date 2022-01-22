import { gql } from "@apollo/client";
import {
  EVENT_FIELDS,
  REVIEW_FIELDS,
  SPORT_TYPE_FIELDS,
  SPORTS_GROUND_FIELDS,
  TRAINER_FIELDS,
  USER_FIELDS,
} from "./fragments/fragment";

export const REGISTRATION_MUTATION = gql`
  mutation Register($input: RegistrationRequest!) {
    registration(input: $input) {
      user {
        phoneNumber
      }
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  ${EVENT_FIELDS}
  ${SPORT_TYPE_FIELDS}
  ${SPORTS_GROUND_FIELDS}
  ${TRAINER_FIELDS}
  ${USER_FIELDS}
  mutation Login($email: String, $password: String, $token: String) {
    login(email: $email, password: $password, token: $token) {
      token
      user {
        ...UserFields
        trainer {
          ...TrainerFields
        }
        sportsGrounds {
          ...SportsGroundFields
        }
      }
    }
  }
`;

export const UPDATE_SPORT_TYPES = gql`
  ${SPORT_TYPE_FIELDS}
  mutation UpdateSportTypes(
    $id: Int!
    $sportType: SportTypeForInput!
    $isDelete: Boolean!
    $accountType: String!
  ) {
    updateSportTypes(
      id: $id
      sportType: $sportType
      isDelete: $isDelete
      accountType: $accountType
    ) {
      ...SportTypeFields
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  ${USER_FIELDS}
  mutation UpdateUser($userRequest: UserRequest!) {
    updateUser(userRequest: $userRequest) {
      user {
        ...UserFields
      }
      token
    }
  }
`;

export const UPDATE_TRAINER_MUTATION = gql`
  ${TRAINER_FIELDS}
  ${USER_FIELDS}
  mutation UpdateTrainer($trainerRequest: TrainerRequest!) {
    updateTrainer(trainerRequest: $trainerRequest) {
      user {
        ...UserFields
        trainer {
          ...TrainerFields
        }
      }
      token
    }
  }
`;

export const UPDATE_GYM_MUTATION = gql`
  ${SPORTS_GROUND_FIELDS}
  ${USER_FIELDS}
  mutation UpdateGym($sportsGround: SportsGroundRequest!) {
    updateGym(sportsGround: $sportsGround) {
      user {
        ...UserFields
        sportsGrounds {
          ...SportsGroundFields
        }
      }
      token
    }
  }
`;

export const FILTER_QUERY = gql`
  ${EVENT_FIELDS}
  ${SPORTS_GROUND_FIELDS}
  ${TRAINER_FIELDS}
  query FilterQuery($filterRequest: FilterRequest!) {
    filter(filterRequest: $filterRequest) {
      events {
        ...EventFields
      }
      sportsGrounds {
        ...SportsGroundFields
      }
      trainers {
        ...TrainerFields
      }
    }
  }
`;

export const LOAD_SPORT_TYPES = gql`
  ${SPORT_TYPE_FIELDS}
  query getSportTypes {
    sportTypes {
      ...SportTypeFields
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation UPLOAD_FILE($file: Upload!, $id: Int!, $accountType: String!) {
    singleUpload(file: $file, id: $id, accountType: $accountType) {
      filename
      link
    }
  }
`;

export const GET_GYM = gql`
  ${SPORTS_GROUND_FIELDS}
  query getSingleGym($id: Int!, $userId: Int) {
    sportsGround(id: $id, userId: $userId) {
      ...SportsGroundFields
    }
  }
`;

export const GET_TRAINER = gql`
  ${TRAINER_FIELDS}
  query getSingleTrainer($id: Int!, $userId: Int) {
    trainer(id: $id, userId: $userId) {
      ...TrainerFields
    }
  }
`;

export const DELETE_PHOTO = gql`
  mutation deletePhoto($id: Int!, $link: String!, $accountType: String!) {
    deletePhoto(id: $id, link: $link, accountType: $accountType)
  }
`;

export const LOST_PASSWORD = gql`
  query lostPassword($userEmail: String!) {
    lostPassword(userEmail: $userEmail)
  }
`;

export const CHECK_TOKEN_VALIDITY = gql`
  query checkTokenValidity($token: String!) {
    checkTokenValidity(token: $token)
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword(
    $oldPassword: String!
    $newPassword: String!
    $token: String!
  ) {
    changePassword(
      oldPassword: $oldPassword
      newPassword: $newPassword
      token: $token
    ) {
      void
    }
  }
`;

export const CHANGE_LOST_PASSWORD = gql`
  mutation changeLostPassword($token: String!, $newPassword: String!) {
    changeLostPassword(token: $token, newPassword: $newPassword)
  }
`;

export const DELETE_EVENTS = gql`
  mutation DeleteEvents($ids: [Int!]!) {
    deleteEvents(ids: $ids)
  }
`;

export const UPDATE_EVENT = gql`
  ${EVENT_FIELDS}
  mutation UpdateEvent($eventRequest: EventRequest!) {
    updateEvent(eventRequest: $eventRequest) {
      ...EventFields
    }
  }
`;

export const ADD_EVENT = gql`
  ${EVENT_FIELDS}
  mutation AddEvent($eventRequest: EventRequest!) {
    addEvent(eventRequest: $eventRequest) {
      ...EventFields
    }
  }
`;

export const GET_USER_EVENTS = gql`
  ${EVENT_FIELDS}
  query getEventsForUser($userId: Int!) {
    getEventsForUser(userId: $userId) {
      ...EventFields
    }
  }
`;

export const CREATE_RESERVATION_MUTATION = gql`
  mutation CreateReservation($userId: Int!, $eventId: Int!) {
    createReservation(userId: $userId, eventId: $eventId)
  }
`;

export const REMOVE_RESERVATION_MUTATION = gql`
  mutation RemoveReservation($userId: Int!, $eventId: Int!) {
    deleteReservation(userId: $userId, eventId: $eventId)
  }
`;

export const POST_REVIEW = gql`
  ${REVIEW_FIELDS}
  mutation PostReview(
    $reviewRequest: ReviewRequest!
    $id: Int!
    $accountType: String!
  ) {
    postReview(
      reviewRequest: $reviewRequest
      id: $id
      accountType: $accountType
    ) {
      ...ReviewFields
    }
  }
`;
