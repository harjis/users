import React from "react";

import { LoadingState } from "../../types";

import styles from "./Loading.module.css";

type Props = {
  loadingState: LoadingState;
  error: string | null;
};
const Loading: React.FC<Props> = (props) => {
  if (props.loadingState === LoadingState.NOT_LOADED) {
    return <div className={styles.container}>Not loaded</div>;
  } else if (props.loadingState === LoadingState.LOADING) {
    return <div className={styles.container}>Loading...</div>;
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};

export default Loading;
