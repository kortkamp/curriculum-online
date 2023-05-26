'use client';

import { useEffect, useMemo, useState } from 'react';

const useCache = < T extends (arg:any)=> any>
  (callback: T, timeout: number = 2000) => {
  const [argumentData, setArgumentData] = useState<Parameters<T>[0]>();

  const [resultData, setResultData] = useState <Awaited<ReturnType<T>>>();

  const [triggerTime, setTriggerTime] = useState(0);

  const memoData = useMemo(() => argumentData, [argumentData]);

  // const updateRequest = (arg: Parameters<T>[0]) => {
  //   setArgumentData({ ...arg });
  // };

  useEffect(() => {
    let timer: number;
    const currentTime = (new Date()).getTime();
    if (!memoData) return () => {};

    const runCallback = async () => {
      const result = await callback(memoData);
      setResultData(result);
    };

    if (currentTime > triggerTime + timeout) {
      runCallback();
      setTriggerTime(currentTime);
    } else {
      const remainingTime = triggerTime + timeout - currentTime;
      timer = window.setTimeout(() => {
        runCallback();
        setTriggerTime(currentTime);
      }, remainingTime);
    }
    return () => { clearTimeout(timer); };
  }, [memoData]);

  return { resultData, updateRequest: setArgumentData };
};

export default useCache;
