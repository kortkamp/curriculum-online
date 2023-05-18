import { useEffect, useMemo, useState } from 'react';

const useCache = < T extends (arg:any)=> any>
  (callback: T, timeout: number = 2000) => {
  const [argumentData, setArgumentData] = useState<Parameters<T>[0]>();

  const [resultData, setResultData] = useState <ReturnType<T>>();

  const [triggerTime, setTriggerTime] = useState(0);

  const memoData = useMemo(() => argumentData, [argumentData]);

  const updateRequest = (arg: Parameters<T>[0]) => setArgumentData(arg);

  useEffect(() => {
    let timer: number;
    const currentTime = (new Date()).getTime();
    if (!memoData) return () => {};

    if (currentTime > triggerTime + timeout) {
      setResultData(callback(memoData));
      setTriggerTime(currentTime);
    } else {
      const remainingTime = triggerTime + timeout - currentTime;
      timer = window.setTimeout(() => {
        setResultData(callback(memoData));
        setTriggerTime(currentTime);
      }, remainingTime);
    }
    return () => { clearTimeout(timer); };
  }, [memoData, timeout, callback]);

  return { resultData, updateRequest };
};

export default useCache;
