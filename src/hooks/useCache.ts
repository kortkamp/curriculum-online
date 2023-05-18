import { useEffect, useMemo, useState } from 'react';

const useCache = < T extends (curriculum:any)=> any>
  (callback: T, timeout: number = 2000) => {
  const [argumentData, setArgumentData] = useState<Parameters<T>[0]>();

  const [resultData, setResultData] = useState <ReturnType<T>>();

  const [triggerTime, setTriggerTime] = useState(0);

  const memoData = useMemo(() => argumentData, [argumentData]);

  const updateRequest = (arg: Parameters<T>[0]) => setArgumentData(arg);

  useEffect(() => {
    const currentTime = (new Date()).getTime();
    if (currentTime < triggerTime) return;
    setTimeout(() => {
      if (memoData) {
        setResultData(callback(memoData));
      }
    }, timeout);
    setTriggerTime(currentTime + timeout);
  }, [memoData, timeout, callback, triggerTime]);

  return { resultData, updateRequest };
};

export default useCache;
