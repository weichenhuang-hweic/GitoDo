import '../styles/globals.css';
import App from 'next/app';
import React from 'react';
import withReduxStore from '../redux/lib/with-redux-store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import HeadInfo from '../components/headInfo';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const persistor = persistStore(reduxStore);
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <HeadInfo></HeadInfo>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
