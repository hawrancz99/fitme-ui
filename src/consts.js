// USER REDUCER
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import * as React from "react";

export const USER_LOADED = "USER_LOADED";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_EVENTS_LOADED = "USER_EVENTS_LOADED";

// REGISTRATION REDUCER
export const REGISTRATION_ACCOUNT_TYPE_SELECTED =
  "REGISTRATION_ACCOUNT_TYPE_SELECTED";
export const REGISTRATION_FORM_FILLED = "REGISTRATION_FORM_FILLED";
export const REGISTRATION_DATA_CLEARED = "REGISTRATION_DATA_CLEARED";
export const REGISTRATION_STEP_CHANGED = "REGISTRATION_STEP_CHANGED";

// SPORTSGROUND REDUCER
export const SPORTS_GROUND_LOADED = "SPORTS_GROUND_LOADED";
export const SPORTS_GROUND_SPORTS_TYPE_CHANGED =
  "SPORTS_GROUND_SPORTS_TYPE_CHANGED";
export const SPORTS_GROUND_PHOTO_ADDED = "SPORTS_GROUND_PHOTO_ADDED";
export const SPORTS_GROUND_PHOTO_DELETED = "SPORTS_GROUND_PHOTO_DELETED";
export const SPORTS_GROUND_EVENTS_DELETED = "SPORTS_GROUND_EVENTS_DELETED";
export const SPORTS_GROUND_EVENT_ADDED = "SPORTS_GROUND_EVENT_ADDED";
export const SPORTS_GROUND_EVENT_UPDATED = "SPORTS_GROUND_EVENT_UPDATED";
export const SPORTS_GROUND_REVIEW_ADDED = "SPORTS_GROUND_REVIEW_ADDED";

// ALERT REDUCER
export const ALERT_OPEN = "ALERT_OPEN";
export const BACKDROP_OPEN = "BACKDROP_OPEN";

// FILTER REDUCER
export const FILTER_DATA_LOADED = "FILTER_DATA_LOADED";
export const FILTER_LOCATION_LOADED = "FILTER_LOCATION_LOADED";
export const FILTER_SPORT_TYPES_LOADED = "FILTER_SPORT_TYPES_LOADED";
export const FILTER_SPORT_TYPES_CHECKED = "FILTER_SPORT_TYPES_CHECKED";
export const RESET_FILTER = "RESET_FILTER";
export const SORT_CHANGED = "SORT_CHANGED";
export const FILTER_PAGE_CHANGED = "FILTER_PAGE_CHANGED";
export const FILTER_BY_CHANGED = "FILTER_BY_CHANGED";

// TRAINER REDUCER
export const TRAINER_LOADED = "TRAINER_LOADED";
export const TRAINER_SPORTS_TYPE_CHANGED = "TRAINER_SPORTS_TYPE_CHANGED";
export const TRAINER_PHOTO_ADDED = "TRAINER_PHOTO_ADDED";
export const TRAINER_PHOTO_DELETED = "TRAINER_PHOTO_DELETED";
export const TRAINER_EVENTS_DELETED = "TRAINER_EVENTS_DELETED";
export const TRAINER_EVENT_ADDED = "TRAINER_EVENT_ADDED";
export const TRAINER_EVENT_UPDATED = "TRAINER_EVENT_UPDATED";
export const TRAINER_REVIEW_ADDED = "TRAINER_REVIEW_ADDED";

// EVENTS TABLE COLUMNS
export const columns = (events, setEventForEdit, setOpen) => [
  {
    field: "Editace",
    headerName: "",
    width: 50,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation();
        const api = params.api;
        const thisRow = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        setEventForEdit(events.find((e) => e.id === thisRow.id));
        setOpen(true);
      };

      return (
        <IconButton className="float-right" onClick={onClick}>
          <ModeEditIcon color="primary" />
        </IconButton>
      );
    },
  },
  {
    field: "id",
    headerName: "ID",
    width: 10,
    tooltipPosition: "center-right",
  },
  {
    field: "name",
    headerName: "Název události",
    width: 270,
  },
  {
    field: "price",
    headerName: "Cena (Kč)",
    width: 130,
  },
  {
    field: "sportType",
    headerName: "Typ",
    width: 135,
  },
  {
    field: "capacity",
    headerName: "Kapacita",
    width: 100,
  },
  {
    field: "dateFrom",
    headerName: "Datum od",
    width: 180,
  },
  {
    field: "dateTo",
    headerName: "Datum do",
    width: 180,
  },
];

// VALIDATIONS
export const gymRegistrationValidatedFields = {
  name: {
    type: ["required"],
  },
  phoneNumber: {
    type: ["maxLength"],
    maxLength: 16,
  },
  registrationNumber: {
    type: ["required"],
  },
  email: {
    type: ["email", "required"],
  },
  street: {
    type: ["required"],
  },
  city: {
    type: ["required"],
  },
  zip: {
    type: ["required"],
  },
  descNumber: {
    type: ["required"],
  },
  password: {
    type: ["password", "required"],
  },
  passwordConfirmation: {
    type: ["compare", "required"],
    compareWith: "password",
  },
};

export const gymUpdateValidatedFields = {
  name: {
    type: ["required"],
  },
  phoneNumber: {
    type: ["maxLength"],
    maxLength: 16,
  },
  registrationNumber: {
    type: ["required"],
  },
  email: {
    type: ["email", "required"],
  },
  street: {
    type: ["required"],
  },
  city: {
    type: ["required"],
  },
  zip: {
    type: ["required"],
  },
  descNumber: {
    type: ["required"],
  },
  facebook: {
    type: ["facebook"],
  },
  instagram: {
    type: ["instagram"],
  },
};

export const personalRegistrationValidatedFields = {
  firstName: {
    type: ["required"],
  },
  lastName: {
    type: ["required"],
  },
  phoneNumber: {
    type: ["maxLength"],
    maxLength: 16,
  },
  email: {
    type: ["email", "required"],
  },
  password: {
    type: ["password", "required"],
  },
  passwordConfirmation: {
    type: ["compare", "required"],
    compareWith: "password",
  },
};

export const personalUpdateValidatedFields = {
  firstName: {
    type: ["required"],
  },
  lastName: {
    type: ["required"],
  },
  phoneNumber: {
    type: ["maxLength"],
    maxLength: 16,
  },
  email: {
    type: ["email", "required"],
  },
};

export const trainerRegistrationValidatedFields = {
  firstName: {
    type: ["required"],
  },
  lastName: {
    type: ["required"],
  },
  phoneNumber: {
    type: ["maxLength"],
    maxLength: 16,
  },
  email: {
    type: ["email", "required"],
  },
  street: {
    type: ["required"],
  },
  city: {
    type: ["required"],
  },
  zip: {
    type: ["required"],
  },
  descNumber: {
    type: ["required"],
  },
  password: {
    type: ["password", "required"],
  },
  passwordConfirmation: {
    type: ["compare", "required"],
    compareWith: "password",
  },
};

export const trainerUpdateValidatedFields = {
  firstName: {
    type: ["required"],
  },
  lastName: {
    type: ["required"],
  },
  phoneNumber: {
    type: ["maxLength"],
    maxLength: 16,
  },
  email: {
    type: ["email", "required"],
  },
  street: {
    type: ["required"],
  },
  city: {
    type: ["required"],
  },
  zip: {
    type: ["required"],
  },
  descNumber: {
    type: ["required"],
  },
  facebook: {
    type: ["facebook"],
  },
  instagram: {
    type: ["instagram"],
  },
};

export const loginValidatedFields = {
  email: {
    type: ["email", "required"],
  },
  password: {
    type: ["required"],
  },
};

export const newPasswordFields = {
  oldPassword: {
    type: ["password", "required"],
  },
  newPassword: {
    type: ["password", "required"],
  },
  passwordConfirmation: {
    type: ["compare", "required"],
    compareWith: "newPassword",
  },
};

export const newPasswordTokenFields = {
  newPassword: {
    type: ["password", "required"],
  },
  passwordConfirmation: {
    type: ["compare", "required"],
    compareWith: "newPassword",
  },
};

export const eventFields = {
  name: {
    type: ["required"],
  },
  sportType: {
    type: ["required"],
  },
  dateFrom: {
    type: ["required"],
  },
  dateTo: {
    type: ["required"],
  },
  price: {
    type: ["required"],
  },
  capacity: {
    type: ["required"],
  },
};

export const USER_TYPES = {
  USER: "personal",
  SPORTS_GROUND: "gym",
  TRAINER: "trainer",
  UNREGISTERED: "unregistered",
};
