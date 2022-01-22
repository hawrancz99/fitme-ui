import { useMutation } from "@apollo/client";
import { UPDATE_SPORT_TYPES } from "../../graphql/graphql";
import { fireSportsGroundSportTypesChanged } from "../../actions/sportsGround/sportsGroundActions";
import { fireTrainerSportTypesChanged } from "../../actions/trainer/trainerActions";
import { useDispatch } from "react-redux";
import { afterApolloCallAction } from "../../actions/common";
import { removeTypeName } from "../../utils/utils";

export function useSportTypesLogic(accountType) {
  const dispatch = useDispatch();

  const [updateSportTypes] = useMutation(UPDATE_SPORT_TYPES, {
    onCompleted: ({ updateSportTypes: sportType }) => {
      accountType === "gym" &&
        dispatch(fireSportsGroundSportTypesChanged(removeTypeName(sportType)));
      accountType === "trainer" &&
        dispatch(fireTrainerSportTypesChanged(removeTypeName(sportType)));
      dispatch(afterApolloCallAction("success", "Aktivity úspěšně změněny"));
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepovedlo se změnit aktivity"));
    },
  });

  return [updateSportTypes];
}
