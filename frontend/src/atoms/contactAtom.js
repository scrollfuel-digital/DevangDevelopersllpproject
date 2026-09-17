
import "../utils/recoilPolyfill";
import { atomFamily } from "recoil";

export const contactSubmittingState = atomFamily({
  key: "contactSubmittingState",
  default: false,
});

export const contactSuccessState = atomFamily({
  key: "contactSuccessState",
  default: false,
});

export const contactErrorState = atomFamily({
  key: "contactErrorState",
  default: null,
});

export const contactResponseState = atomFamily({
  key: "contactResponseState",
  default: null,
});
