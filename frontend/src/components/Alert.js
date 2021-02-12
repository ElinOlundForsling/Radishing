import React, { useEffect, useState } from 'react';

const Alert = ({ type, expire, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (expire === 0) {
      setVisible(true);
    } else {
      setVisible(true);
      const timer = window.setTimeout(() => {
        setVisible(false);
      }, expire);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [expire]);

  return visible && <div className={`alert alert-${type}`}>{children}</div>;
};

Alert.defaultProps = {
  color: 'blue',
  expire: 0,
};

export default Alert;
