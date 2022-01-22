import { useState } from "react";
import {
  validateEmail,
  validateFacebook,
  validateInstagram,
  validatePassword,
} from "./index";

/**
 * Hook for field validations
 * Use this when your form has a lot of fields
 * so each of them doesnt need to have its own error object
 * */
const useValidations = (requiredFields) => {
  const createInitial = () => {
    const result = {};
    Object.keys(requiredFields).forEach((field) => {
      result[field] = {
        required: requiredFields[field].type.includes("required"),
        error: false,
        type: requiredFields[field].type,
        maxLength: requiredFields[field].maxLength,
        compareWith: requiredFields[field].compareWith,
      };
    });
    return result;
  };

  const [objectOfErrors, setValue] = useState(createInitial());

  const validate = (id, valueToValidate, valueToCompare = null) => {
    const allFieldsValidations = objectOfErrors[id].type;
    const result = [];
    allFieldsValidations.forEach((validation, indx) => {
      switch (objectOfErrors[id].type[indx]) {
        case "password":
          result.push(!validatePassword(valueToValidate));
          break;
        case "maxLength":
          result.push(valueToValidate?.length > objectOfErrors[id].maxLength);
          break;
        case "email":
          result.push(!validateEmail(valueToValidate));
          break;
        case "required":
          result.push(!valueToValidate);
          break;
        case "fnc":
          result.push(!objectOfErrors[id].fnc(valueToValidate));
          break;
        case "compare":
          result.push(valueToValidate !== valueToCompare);
          break;
        case "facebook":
          if (!valueToValidate) {
            result.push(false);
          } else {
            result.push(!validateFacebook(valueToValidate));
          }
          break;
        case "instagram":
          if (!valueToValidate) {
            result.push(false);
          } else {
            result.push(!validateInstagram(valueToValidate));
          }
          break;
        default:
          result.push(false);
      }
      setValue((state) => ({
        ...state,
        [id]: { ...state[id], error: result.includes(true) },
      }));
      return result.includes(true);
    });
    return result.includes(true);
  };

  const checkNextDisabled = (form) => {
    let isDisabled = false;
    Object.keys(objectOfErrors).forEach((key) => {
      if (validate(key, form[key], form[objectOfErrors[key].compareWith])) {
        isDisabled = true;
      }
    });
    return isDisabled;
  };

  return [
    objectOfErrors,
    {
      reset: () => setValue(createInitial()),
      validateFnc: validate,
      isNextDisabled: checkNextDisabled,
    },
  ];
};

export default useValidations;
