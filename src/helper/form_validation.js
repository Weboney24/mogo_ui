import { join } from "lodash";

export const emailRules = [
  {
    required: true,
    message: "Please enter your email address",
  },
  {
    type: "email",
    message: "Please enter valid email address",
  },
];

export const passwordRules = [
  {
    required: true,
    message: "Please enter your password",
  },
];

export const requiredRules = (message) => {
  return {
    required: true,
    message: message,
  };
};

export const firstLettertoCapitalize = (letter) => {
  try {
    let first = letter.charAt(0).toUpperCase();
    return first + letter.slice(1, letter.length).toLowerCase();
  } catch (e) {}
};
