import React from "react";

/**
 * Polyfill for React 19 compatibility with Recoil.
 * 
 * In React 19, `React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` was
 * restructured to `React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE`.
 * Recoil 0.7.7 accesses `ReactCurrentDispatcher` from `__SECRET_INTERNALS...`.
 * This bridge ensures Recoil can read the current hooks dispatcher seamlessly in React 19.
 */
const clientInternals =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

if (!React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && clientInternals) {
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    ReactCurrentDispatcher: {
      get current() {
        return clientInternals?.H;
      },
      set current(val) {
        if (clientInternals) {
          clientInternals.H = val;
        }
      },
    },
    ReactCurrentBatchConfig: {
      transition: null,
    },
    ReactCurrentOwner: {
      current: null,
    },
    ...clientInternals,
  };
}

if (typeof window !== "undefined") {
  window.React = React;
}

export default React;
