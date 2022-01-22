import { useMutation } from "@apollo/client";
import {
  CREATE_RESERVATION_MUTATION,
  REMOVE_RESERVATION_MUTATION,
} from "../../graphql/graphql";
import {
  fireTriggerAlert,
  fireTriggerBackdrop,
} from "../../actions/alert/alertActions";
import { useDispatch } from "react-redux";
import { afterApolloCallAction } from "../../actions/common";

export function useReservationLogic(refreshFn, noBackDrop) {
  const dispatch = useDispatch();

  const [createReservation] = useMutation(CREATE_RESERVATION_MUTATION, {
    onCompleted: () => {
      dispatch(afterApolloCallAction("success", "Přihlášeno"));
      refreshFn();
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepodařilo se přihlásit"));
    },
  });

  const [removeReservation] = useMutation(REMOVE_RESERVATION_MUTATION, {
    onCompleted: () => {
      dispatch(fireTriggerAlert("sucess", "Odhlášeno"));
      refreshFn();
      !noBackDrop && dispatch(fireTriggerBackdrop(false));
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepodařilo se odhlásit"));
    },
  });

  return [createReservation, removeReservation];
}
