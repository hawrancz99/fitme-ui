import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LottieAnimation from './lottie';

const FitmeLoader = ({
  color = 'secondary', loading, children, animation,
}) => (loading ? (
  <div style={{ textAlign: 'center', marginTop: '0.8em' }}>
    {
            animation ? <LottieAnimation lotti={animation} /> : <CircularProgress color={color} />
        }
    {children}
  </div>
) : '');

export default FitmeLoader;
