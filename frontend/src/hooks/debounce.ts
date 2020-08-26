export function debouncedPromise<
  ReturnType,
  T extends (...args: any[]) => any
>(f: T, interval: number): (...args: any[]) => Promise<ReturnType> {
  let timer: number | undefined = undefined;

  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = window.setTimeout(() => resolve(f(...args)), interval);
    });
  };
}
