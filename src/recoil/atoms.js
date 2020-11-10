import { atom } from "recoil";

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const pageNumberState = atom({
  key: "pageNumberState",
  default: 1,
});
