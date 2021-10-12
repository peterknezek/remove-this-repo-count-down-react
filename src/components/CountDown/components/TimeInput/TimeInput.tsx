import { DateTimeFormatter, Duration, LocalTime } from "@js-joda/core";
import * as React from "react";
import { useCountDownContext } from "../../context";
import { useInterval } from "../../hooks";
import styles from "./TimeInput.module.css";

const INTERVAL = 80;
const INITIAL_VALUE = "________";
const DATE_FORMAT = DateTimeFormatter.ofPattern("mm:ss:SS");
const END_STRING = LocalTime.parse("00:00").format(DATE_FORMAT);

interface TimeInputProps {
  onSetDuration: (duration: Duration) => void;
}
export const TimeInput: React.VFC<TimeInputProps> = (props) => {
  const { state, action } = useCountDownContext();
  const [inputValue, setInputValue] = React.useState(INITIAL_VALUE);

  const isCounting = state.isCounting;
  const isDisabled = !!state.startTime;

  const [actualTime, setActualTime] = React.useState<Duration>();
  const handleCountDown = () => {
    if (actualTime) {
      setActualTime((time) => {
        return time?.minusMillis(INTERVAL);
      });
    }
  };

  const { start, stop } = useInterval(handleCountDown, INTERVAL);

  // handle input value when time is running
  React.useEffect(() => {
    if (actualTime) {
      if (actualTime.toNanos() <= 0) {
        stop();
        setInputValue(END_STRING);
        action.handleEnd();
      } else {
        setInputValue(
          LocalTime.ofNanoOfDay(actualTime.toNanos()).format(DATE_FORMAT)
        );
      }
    }
  }, [action, actualTime, stop]);

  // handle input value before time started
  React.useEffect(() => {
    if (!state.duration) {
      setInputValue(INITIAL_VALUE);
    }
    if (isDisabled && isCounting && state.duration) {
      setActualTime(state.duration);
      start();
    } else {
      stop();
    }
  }, [isDisabled, isCounting, start, stop, state.duration]);

  const handleUserNotSetValue = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      const time = Duration.ofNanos(
        LocalTime.parse(e.target.value).toNanoOfDay()
      );
      props.onSetDuration(time);
    } catch (error) {
      console.warn("Parse error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={inputValue}
      disabled={isDisabled}
      onFocus={() => setInputValue("")}
      onChange={handleChange}
      onBlur={handleUserNotSetValue}
    />
  );
};

export default TimeInput;
