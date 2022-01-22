import { useMutation } from "@apollo/client";
import { DELETE_PHOTO, UPLOAD_FILE } from "../../graphql/graphql";
import {
  fireSportsGroundPhotoAdded,
  fireSportsGroundPhotoDeleted,
} from "../../actions/sportsGround/sportsGroundActions";
import {
  fireTrainerPhotoAdded,
  fireTrainerPhotoDeleted,
} from "../../actions/trainer/trainerActions";
import { useDispatch } from "react-redux";
import { afterApolloCallAction } from "../../actions/common";

function useGaleryLogic(accountType) {
  const dispatch = useDispatch();
  const [fetchUpload] = useMutation(UPLOAD_FILE, {
    onCompleted: ({ singleUpload: file }) => {
      accountType === "gym" && dispatch(fireSportsGroundPhotoAdded(file.link));
      accountType === "trainer" && dispatch(fireTrainerPhotoAdded(file.link));
      dispatch(afterApolloCallAction("success", "Fotka úspěšně nahrána"));
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepovedlo se nahrát fotku"));
    },
  });

  const [fetchDeletePhoto] = useMutation(DELETE_PHOTO, {
    onCompleted: ({ deletePhoto: link }) => {
      dispatch(afterApolloCallAction("success", "Fotka úspěšně smazána"));
      accountType === "gym" && dispatch(fireSportsGroundPhotoDeleted(link));
      accountType === "trainer" && dispatch(fireTrainerPhotoDeleted(link));
    },
    onError: () => {
      dispatch(afterApolloCallAction("error", "Nepovedlo se smazat fotku"));
    },
  });

  return [fetchUpload, fetchDeletePhoto];
}

export default useGaleryLogic;
