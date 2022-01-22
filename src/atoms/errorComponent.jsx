import * as React from 'react';

const ErrorComponent = ({ color = '#d32f2f', children, error }) => (error ? <span style={{ color }}>{children}</span> : '');

export default ErrorComponent;
