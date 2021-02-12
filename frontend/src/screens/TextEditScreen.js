import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateText } from '../actions/textActions';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { TEXT_UPDATE_RESET } from '../constants/textConstants';

const TextEditScreen = () => {
  const [homeText, setHomeText] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [privacyText, setPrivacyText] = useState('');
  const [openingHoursText, setOpeningHoursText] = useState('');

  const textContent = useSelector(state => state.textContent);
  const { loading, error, home, about, privacy, openingHours } = textContent;
  const textUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = textUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TEXT_UPDATE_RESET });
    } else {
      setHomeText(home);
      setAboutText(about);
      setPrivacyText(privacy);
      setOpeningHoursText(openingHours);
    }
  }, [dispatch, successUpdate, about, home, privacy, openingHours]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      updateText({
        home: homeText,
        about: aboutText,
        privacy: privacyText,
        openingHours: openingHoursText,
      }),
    );
  };

  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert type='warning' expire={0}>
            {error}
          </Alert>
        ) : (
          <>
            <h2>Ändra texter</h2>
            {loadingUpdate && <Spinner />}
            {errorUpdate && (
              <Alert type='warning' expire={4000}>
                Kunde inte uppdatera, försök igen
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <label htmlFor='home'>Huvudsidan</label>
              <textarea
                id='home'
                value={homeText}
                onChange={e => setHomeText(e.target.value)}
              />
              <label htmlFor='about'>Om Torvan</label>
              <textarea
                id='about'
                value={aboutText}
                onChange={e => setAboutText(e.target.value)}
              />
              <label htmlFor='home'>Köpvillkor</label>
              <textarea
                id='privacy'
                value={privacyText}
                onChange={e => setPrivacyText(e.target.value)}
              />
              <label htmlFor='opening-hours'>Öppettider</label>
              <textarea
                id='opening-hours'
                value={openingHoursText}
                onChange={e => setOpeningHoursText(e.target.value)}
              />
              <button type='submit'>Spara ändringar</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default TextEditScreen;
