import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './store/store';
import { SWRConfig } from 'swr';
import { commonHttp } from './util/http';
import { HelmetProvider } from 'react-helmet-async';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <HelmetProvider>
      <SWRConfig value={{
         
         fetcher : (url, params) => commonHttp.get(url, {params}).then(res => res.data)
      }}>
    <App />
    </SWRConfig>
    </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
