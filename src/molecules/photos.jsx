import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import {DeleteForever, Fullscreen} from '@mui/icons-material';
import FitmeModal from '../molecules/fitmeModal';
import '../organisms/galery/galery.css';

const Photos = ({photos = [], deletePhoto}) => {
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const {gymId, trainerId} = useParams();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
    };

    const handleModal = (link) => {
        setImageModal(!imageModal);
        if (link) {
            setSelectedImage(link);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <>{
            photos?.length > 0 ?
                <ImageList rowHeight={200} cols={3} className="photos-grid" style={{borderBottom: '1px solid #C1C6E4'}}>
                    {photos.map((link) => (
                        <ImageListItem key={link} style={{paddingBottom: '10px'}}>
                            <img src={`${link}`} srcSet={`${link}`} alt="Fotka" className="gallery-img"/>
                            <ImageListItemBar
                                style={{background: 'none', left: '10px', top: '3px'}}
                                position="top"
                                actionIcon={(
                                    <IconButton
                                        style={{background: '#5680e9', padding: '5px'}}
                                        onClick={() => handleModal(link)}
                                    >
                                        <Fullscreen style={{color: 'white'}}/>
                                    </IconButton>
                                )}
                                actionPosition="left"
                            />
                            {!gymId && !trainerId &&
                            <ImageListItemBar
                                style={{
                                    background: 'none', left: '30%', right: '10px', top: '3px',
                                }}
                                position="top"
                                actionIcon={(
                                    <IconButton
                                        style={{background: 'rgb(136 96 208 / 96%)', padding: '5px'}}
                                        onClick={() => deletePhoto(link)}
                                    >
                                        <DeleteForever style={{color: 'white'}}/>
                                    </IconButton>
                                )}
                                actionPosition="right"
                            />
                            }
                        </ImageListItem>
                    ))}
                </ImageList>
                : (
                    <div style={{
                        minHeight: '10vh',
                        textAlign: 'center'
                    }}>
                        <h3>Žádné fotky v galerii.</h3>
                    </div>
                )
        }

            <FitmeModal
                isOpen={imageModal}
                onClose={handleModal}
                style={style}
                body={(
                    <ImageListItem style={{listStyle: 'none'}}>
                        <img
                            src={`${selectedImage}`}
                            srcSet={`${selectedImage}`}
                            alt="Fotka"
                            loading="lazy"
                            className="modal-image"
                        />
                    </ImageListItem>
                )}
            />
        </>
    );
};

export default Photos;
