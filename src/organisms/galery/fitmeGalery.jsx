import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import './galery.css';
import Photos from '../../molecules/photos';
import useGaleryLogic from './useGaleryLogic';
import { fireTriggerBackdrop } from '../../actions/alert/alertActions';
import { useDispatch } from 'react-redux';

const FitmeGalery = ({ photos = [], accountType, id }) => {
  const dispatch = useDispatch();
  const [fetchUpload, fetchDeletePhoto] = useGaleryLogic(accountType);

  const deletePhoto = (link) => {
    dispatch(fireTriggerBackdrop(true));
    return fetchDeletePhoto({
      variables: {
        link,
        id,
        accountType
      }
    });
  };

  const handleUpload = () => {
    setImage(null);
    dispatch(fireTriggerBackdrop(true));
    return fetchUpload({
      variables: {
        file: selectedFile,
        id,
        accountType
      }
    });
  };

  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    if (event?.target?.files?.length > 0) {
      setSelectedFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Container style={{ text: 'center' }}>
      <Divider style={{
        marginTop: '25px',
        marginBottom: '25px'
      }}>
        <Chip label="Galerie" className="admin-page-chip"/>
      </Divider>
      <div className="upload-photo-div">

        {
          image

            ? (
              <ImageListItem key={image} className="uploaded-photo">
                <img
                  src={image}
                  alt=""
                />
              </ImageListItem>
            )

            : null
        }
        <div style={{ marginTop: '15px' }} onChange={onFileChange}>
          {
            image
              ? (
                <Container className="upload-photo-btns">
                  <Button
                    className="primaryBtn"
                    style={{
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      color: 'white',
                      marginBottom: '25px',
                    }}
                    disabled={!image}
                    onClick={handleUpload}
                  >
                    Nahrát fotku
                  </Button>
                  <Button className="deleteBtn" style={{
                    paddingTop: '6px',
                    paddingBottom: '6px'
                  }} disabled={!image} onClick={() => setImage(null)}>
                    Smazat fotku
                  </Button>
                </Container>
              )
              : (
                <div style={{ marginTop: '25px' }}>
                  <input type="file" name="uploadfile" id="img" style={{ display: 'none' }} accept="image/*"/>
                  <label
                    className="primaryBtn"
                    style={{
                      padding: '10px',
                      color: 'white',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    htmlFor="img"
                  >
                    Přidat foto
                  </label>
                </div>
              )
          }
        </div>
      </div>
      {
        photos.length > 0
          ? <Photos photos={photos} deletePhoto={deletePhoto}/>
          : (
            <div style={{
              minHeight: '10vh',
              textAlign: 'center'
            }}>
              <h3>Žádné fotky v galerii</h3>
            </div>
          )
      }
    </Container>
  );
};

export default FitmeGalery;
