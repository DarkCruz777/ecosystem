import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'virtual:uno.css'; // Import UnoCSS styles

// Base styles
import './styles/reset.css';
import './styles/keyframes.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);