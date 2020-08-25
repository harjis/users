import React, { ReactNode } from "react";

import styles from "./Loading.module.css";

type Props<T> = {
  children: (data: T) => ReactNode;
  data: T | undefined;
  loadingState: boolean;
  error: string | undefined;
};
export default function Loading<T>(props: Props<T>) {
  if (props.loadingState) {
    return <div className={styles.container}>Loading...</div>;
  } else {
    if (props.data === undefined) {
      return null;
    }
    return <React.Fragment>{props.children(props.data)}</React.Fragment>;
  }
}
