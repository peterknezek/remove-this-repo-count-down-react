import { Duration } from "@js-joda/core";
import * as React from "react";
import { useInterval } from "../hooks";
import { actions, initialState, reducer, State } from "./reducer";

const initialActions = {
  handleStart: (userInput: Duration) => {},
  handlePause: () => {},
  handleEnd: () => {},
  handleStop: () => {},
};

const CountDownContext = React.createContext<{
  state: State;
  action: typeof initialActions;
}>({ state: initialState, action: initialActions });

export const CountDownProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { start, stop } = useInterval(() => {
    dispatch(actions.updateDuration);
  }, 1000);

  const action = React.useMemo<typeof initialActions>(
    () => ({
      handleStart: (userInput: Duration) => {
        start();
        state.initDuration
          ? dispatch(actions.resume)
          : dispatch(actions.setDuration(userInput));
      },
      handlePause: () => {
        stop();
        dispatch(actions.pause);
      },
      handleEnd: () => {
        stop();
        dispatch(actions.end);
      },
      handleStop: () => {
        stop();
        dispatch(actions.reset);
      },
    }),
    [start, state.initDuration, stop]
  );

  const value = React.useMemo(() => ({ state, action }), [state, action]);
  return (
    <CountDownContext.Provider value={value}>
      {children}
    </CountDownContext.Provider>
  );
};

export const useCountDownContext = () => {
  const context = React.useContext(CountDownContext);
  if (context === undefined) {
    throw new Error("useTime must be used within a TimeContext");
  }
  return context;
};
