import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider,createTheme } from '@material-ui/core/styles';


const theme = createTheme({
  typography:{
    fontFamily:"'Noto Sans KR',sans-serif"
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <createTheme theme={theme}>
  <React.StrictMode>
      <App /> 
  </React.StrictMode>
  </createTheme>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
