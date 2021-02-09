import React, { useEffect } from 'react';

const useTimeout = (callback, timeout = 0, { persistRenders = false } = {}) => {
  let timeoutId;
  const cancel = () => timeoutId && clearTimeout(timeoutId);

  useEffect(
    () => {
      timeoutId = setTimeout(callback, timeout);
      return cancel;
    },
    persistRenders
      ? [setTimeout, clearTimeout]
      : [callback, timeout, setTimeout, clearTimeout],
  );

  return cancel;
};

export default useTimeout;
