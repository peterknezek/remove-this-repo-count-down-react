import * as React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { disabled = false, onClick } = props;
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {props.children}
    </button>
  );
};

export default Button;
