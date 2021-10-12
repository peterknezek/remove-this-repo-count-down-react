import * as React from "react";

export const useInterval = (fn: () => void, interval: number) => {
  const updaterId = React.useRef<NodeJS.Timeout>();
  const [isOn, setIsOn] = React.useState(false);

  React.useEffect(() => {
    if (isOn) {
      updaterId.current = setInterval(() => {
        fn();
      }, interval);
    }
    return () => clearInterval(updaterId.current!);
  }, [fn, interval, isOn]);

  return React.useMemo(
    () => ({
      start: () => setIsOn(true),
      stop: () => {
        setIsOn(false);
        clearInterval(updaterId.current!);
      },
    }),
    []
  );
};
