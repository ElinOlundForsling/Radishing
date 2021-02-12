import React from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';

const AboutScreen = () => {
  const textContent = useSelector(state => state.textContent);
  const { loading, error, about } = textContent;
  return (
    <>
      <h2>Om Torvan</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type='warning' expire={0}>
          Kunde inte ladda köpvilkoren, försökt igen
        </Alert>
      ) : (
        <p>{about}</p>
      )}
    </>
  );
};

export default AboutScreen;
