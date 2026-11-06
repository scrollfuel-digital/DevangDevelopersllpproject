import React from "react";

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
