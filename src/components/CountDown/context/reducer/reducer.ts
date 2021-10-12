import { Duration, LocalTime } from "@js-joda/core";
import { timeLeftMesure } from "./utils";
import { Actions, ActionTypes } from "./actions";

export interface State {
  /** duration which user set on init */
  initDuration?: Duration;
  /** time which left */
  duration?: Duration;
  /** if is counter is on */
  isCounting: boolean;
  /** When start counting */
  startTime?: LocalTime;
}

export const initialState = {
  isCounting: false,
};

export const reducer: React.Reducer<State, Actions> = (
  state: State,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.setDuration:
      return {
        ...state,
        initDuration: action.payload,
        duration: action.payload,
        isCounting: true,
        startTime: LocalTime.now(),
      };
    case ActionTypes.updateDuration:
      return {
        ...state,
        startTime: LocalTime.now(),
        duration: timeLeftMesure(
          state.duration!,
          state.startTime!,
          LocalTime.now()
        ),
      };
    case ActionTypes.pause:
      return {
        ...state,
        duration: timeLeftMesure(
          state.duration!,
          state.startTime!,
          LocalTime.now()
        ),
        isCounting: false,
      };
    case ActionTypes.resume:
      return {
        ...state,
        startTime: LocalTime.now(),
        isCounting: true,
      };
    case ActionTypes.end:
      return {
        ...state,
        isCounting: false,
        duration: Duration.ofNanos(0),
      };
    case ActionTypes.reset:
      return initialState;
    default:
      return state;
  }
};
