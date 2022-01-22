import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../../graphql/graphql";
import { useDispatch } from "react-redux";
import { fireSportsGroundReviewAdded } from "../../actions/sportsGround/sportsGroundActions";
import { fireTrainerReviewAdded } from "../../actions/trainer/trainerActions";
import { afterApolloCallAction } from "../../actions/common";

export function useRatingLogic(gymId, trainerId, setStateValue, setStateText) {
  const dispatch = useDispatch();

  const [postReview] = useMutation(POST_REVIEW, {
    onCompleted: ({ postReview }) => {
      dispatch(afterApolloCallAction("success", "Hodnocení přidáno"));
      gymId && dispatch(fireSportsGroundReviewAdded(postReview));
      trainerId && dispatch(fireTrainerReviewAdded(postReview));
      setStateValue(0);
      setStateText("");
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepovedlo se přidat hodnocení"));
    },
  });
  return [postReview];
}
