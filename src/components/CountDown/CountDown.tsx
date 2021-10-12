import { Duration } from "@js-joda/core";
import * as React from "react";
import { TimeElapsed, TimeInput } from "./components";
import { ActionButtons } from "./components/ActionButtons";
import { CountDownProvider } from "./context";
import styles from "./CountDown.module.scss";

interface CounterProps {}

export const CountDown: React.VFC<CounterProps> = () => {
  const [userInput, setUserInput] = React.useState<Duration>();

  const handleSetValue = (duration: Duration) => {
    setUserInput(duration);
  };

  return (
    <div className={styles.counterBox}>
      <CountDownProvider>
        <TimeElapsed />
        <TimeInput onSetDuration={handleSetValue} />
        <ActionButtons userInput={userInput} />
      </CountDownProvider>
    </div>
  );
};

export default CountDown;
