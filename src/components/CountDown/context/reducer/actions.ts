import { Duration } from "@js-joda/core";

export const enum ActionTypes {
  setDuration,
  updateDuration,
  pause,
  resume,
  end,
  reset,
}

type Action<A extends ActionTypes, P = undefined> = P extends undefined
  ? Readonly<{
      type: A;
    }>
  : Readonly<{
      type: A;
      payload: P;
    }>;

interface ActionCreator<A> {
  (...args: any[]): A;
}

/**
 * Start coundown and set `startTime` and `initDuration` value
 */
export const setDuration: ActionCreator<
  Action<ActionTypes.setDuration, Duration>
> = (duration: Duration) => ({
  type: ActionTypes.setDuration,
  payload: duration,
});

/**
 * Update how much time left by comparing `startTime` and actual time
 */
export const updateDuration: Action<ActionTypes.updateDuration> = {
  type: ActionTypes.updateDuration,
};

/**
 * Stop countdown and save time which let to `duration`
 * @param timeLeft Duration format
 * @returns
 */
export const pause: Action<ActionTypes.pause> = {
  type: ActionTypes.pause,
};

export const resume: Action<ActionTypes.resume> = {
  type: ActionTypes.resume,
};

export const end: Action<ActionTypes.end> = {
  type: ActionTypes.end,
};

export const reset: Action<ActionTypes.reset> = {
  type: ActionTypes.reset,
};

export type Actions =
  | ReturnType<typeof setDuration>
  | typeof updateDuration
  | typeof pause
  | typeof resume
  | typeof end
  | typeof reset;

export const actions = {
  setDuration,
  updateDuration,
  pause,
  resume,
  end,
  reset,
};
