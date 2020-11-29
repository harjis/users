import React from "react";

import styles from "./Header.module.css";
type Props = {
  leftSideComponents: React.ReactNode;
  rightSideComponents: React.ReactNode;
};
export const Header: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div>{props.leftSideComponents}</div>
      <div>{props.rightSideComponents}</div>
    </div>
  );
};
