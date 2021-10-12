import { Duration } from "@js-joda/core";
import * as React from "react";
import { useCountDownContext } from "../../context";
import { Button } from "../Button";
import styles from "./ActionButtons.module.scss";

interface ActionButtonsProps {
  userInput?: Duration;
}

export const ActionButtons: React.VFC<ActionButtonsProps> = (props) => {
  const { state, action } = useCountDownContext();
  const isCounting = state.isCounting;
  const userInput = props.userInput;
  const isInitial = !state.initDuration;

  return React.useMemo(
    () => (
      <div className={styles.buttonsArea}>
        {!isCounting ? (
          <Button onClick={() => action.handleStart(userInput!)}>Start</Button>
        ) : (
          <Button onClick={action.handlePause}>Pause</Button>
        )}
        <Button onClick={action.handleStop} disabled={isInitial}>
          Stop
        </Button>
      </div>
    ),
    [isCounting, action, isInitial, userInput]
  );
};

export default ActionButtons;
