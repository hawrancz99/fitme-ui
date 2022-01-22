import { useMutation } from "@apollo/client";
import { ADD_EVENT, DELETE_EVENTS, UPDATE_EVENT } from "../../graphql/graphql";
import { fireTriggerBackdrop } from "../../actions/alert/alertActions";
import {
  fireSportsGroundEventAdded,
  fireSportsGroundEventsDeleted,
  fireSportsGroundEventsUpdated,
} from "../../actions/sportsGround/sportsGroundActions";
import { useDispatch } from "react-redux";
import {
  fireTrainerEventAdded,
  fireTrainerEventsDeleted,
  fireTrainerEventsUpdated,
} from "../../actions/trainer/trainerActions";
import { afterApolloCallAction } from "../../actions/common";

export function useEventsLogic(accountType, selectedEvents, allEvents) {
  const dispatch = useDispatch();

  const [deleteEvents] = useMutation(DELETE_EVENTS, {
    onCompleted: () => {
      dispatch(afterApolloCallAction("success", "Události smazány"));
      accountType === "gym" &&
        dispatch(
          fireSportsGroundEventsDeleted(selectedEvents.map((e) => e.id))
        );
      accountType === "trainer" &&
        dispatch(fireTrainerEventsDeleted(selectedEvents.map((e) => e.id)));
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepovedlo se smazat události"));
    },
  });

  const [addEvent] = useMutation(ADD_EVENT, {
    onCompleted: ({ addEvent }) => {
      dispatch(afterApolloCallAction("success", "Událost přidána"));
      accountType === "gym" && dispatch(fireSportsGroundEventAdded(addEvent));
      accountType === "trainer" && dispatch(fireTrainerEventAdded(addEvent));
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepovedlo se přidat událost"));
    },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    onCompleted: ({ updateEvent }) => {
      dispatch(fireTriggerBackdrop(false));
      dispatch(afterApolloCallAction("success", "Událost upravena"));
      let finalEvents = allEvents.filter((all) => all.id !== updateEvent.id);
      finalEvents.push(updateEvent);
      accountType === "gym" &&
        dispatch(fireSportsGroundEventsUpdated(finalEvents));
      accountType === "trainer" &&
        dispatch(fireTrainerEventsUpdated(finalEvents));
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepovedlo se upravit událost"));
    },
  });

  return [deleteEvents, addEvent, updateEvent];
}
