import React, {
  forwardRef, useEffect, useRef, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import useGoogleMapsApi from '../utils/useGoogleMapsApi';
import { fireLocationLoaded } from '../actions/filter/filterActions';

// eslint-disable-next-line no-unused-vars
const GoogleSearchField = forwardRef(({ handleSearch, location = '', showSearchBtn }, _) => {
  const inputRef = useRef();
  const autocompleteRef = useRef();
  const googleMapsApi = useGoogleMapsApi();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    if (googleMapsApi) {
      autocompleteRef.current = new googleMapsApi.places.Autocomplete(inputRef.current);
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        setLocalValue(place);
        setError(false);
        dispatch(fireLocationLoaded(place));
      });
    }
  }, [googleMapsApi, dispatch, location]);

  const handleSearchLocal = () => {
    if (!localValue) {
      setError(true);
    } else if (!error) {
      handleSearch();
    }
  };

  return (
    <>
      <TextField
        style={{ margin: '0 auto', width: '70%' }}
        id="location"
        label="Zadejte vaši ulici a č.p."
        className="landing-search-textField"
        required
        inputRef={inputRef}
        helperText={error ? 'Vyberte z nabízených lokací' : ''}
        error={error}
        defaultValue={location ? location.formatted_address : ''}
      />
      {showSearchBtn ? (
        <Button
          variant="contained"
          onClick={handleSearchLocal}
          className="primaryBtn landing-search-btn"
        >
          Hledat
        </Button>
      ) : null}
    </>
  );
});

export default GoogleSearchField;
