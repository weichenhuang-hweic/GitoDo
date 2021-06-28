import Head from 'next/head';
import React from 'react';

class SnapInfo extends React.Component {
  render() {
    return (
      <Head>
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js'
          integrity='sha512-Gk+uNk8NWN235mIkS6B7/424TsDuPDaoAsUekJCKTWLKP6wlaPv+PBGfO7dbvZeibVPGW+mYidz0vL0XaWwz4w=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        ></script>
      </Head>
    );
  }
}

export default SnapInfo;
