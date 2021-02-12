import React from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';

const PrivacyScreen = () => {
  const textContent = useSelector(state => state.textContent);
  const { loading, error, privacy } = textContent;
  return (
    <>
      <h2>Köpvillkor</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type='warning' expire={0}>
          Kunde inte ladda köpvilkoren, försökt igen
        </Alert>
      ) : (
        <p>{privacy}</p>
      )}
    </>
  );
};

export default PrivacyScreen;
