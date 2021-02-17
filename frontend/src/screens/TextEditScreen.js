import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateText } from '../actions/textActions';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { TEXT_UPDATE_RESET } from '../constants/textConstants';

const TextEditScreen = () => {
  const [homeText, setHomeText] = useState('');
  const [aboutImage, setAboutImage] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [privacyText, setPrivacyText] = useState('');
  const [openingHoursText, setOpeningHoursText] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const textContent = useSelector(state => state.textContent);
  const {
    loading,
    error,
    home,
    about,
    aboutImg,
    privacy,
    openingHours,
  } = textContent;
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
      setAboutImage(aboutImg || '');
      setAboutText(about);
      setPrivacyText(privacy);
      setOpeningHoursText(openingHours);
    }
  }, [dispatch, successUpdate, about, home, privacy, openingHours, aboutImg]);

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

  const handleUpload = async e => {
    const file = e.target.files[0];
    const id = e.target.id;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(`/api/upload/${id}`, formData, config);

      setAboutImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong');
      setUploading(false);
    }
  };

  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        {message && (
          <Alert type='warning' expire={4000}>
            {message}
          </Alert>
        )}
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
              {uploading && <Spinner />}
              <div
                className='file-upload-wrapper'
                data-text={aboutImage ? aboutImage : 'Bild till Om Torvan'}>
                <input
                  name='file-upload-field'
                  type='file'
                  id='about'
                  className='file-upload-field'
                  value=''
                  onChange={handleUpload}
                />
              </div>
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
