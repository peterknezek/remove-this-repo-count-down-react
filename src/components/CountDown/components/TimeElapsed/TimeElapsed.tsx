import * as React from "react";
import { useCountDownContext } from "../../context";
import { timeToPercent } from "../../utils";
import styles from "./TimeElapsed.module.css";

interface TimeElapsedProps {}

export const TimeElapsed: React.VFC<TimeElapsedProps> = (props) => {
  const { state } = useCountDownContext();
  return (
    <>
      {state.initDuration && (
        <div className={styles.elapsedBox}>
          <div
            className={styles.elapsedProgress}
            style={{
              height: `${timeToPercent(state.initDuration!, state.duration!)}%`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default TimeElapsed;
