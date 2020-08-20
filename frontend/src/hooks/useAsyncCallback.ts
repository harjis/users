import React from "react";

type IsMounted = () => boolean;
type Callback<Data> = (isMounted: IsMounted) => Promise<Data>;
type WrappedCallback = () => Promise<void>;
export default function useAsyncCallback<Data>(
  callback: Callback<Data>
): WrappedCallback {
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    return (): void => {
      isMounted.current = false;
    };
  }, []);

  return React.useCallback(async () => {
    await callback(() => isMounted.current);
  }, [isMounted, callback]);
}
