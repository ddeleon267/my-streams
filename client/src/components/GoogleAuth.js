import React from 'react';

class GoogleAuth extends React.Component {
  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '727962166634-e32mlaj9opmv4nt9nnacs9uulgs0cl7f.apps.googleusercontent.com',
        scope: 'email'
      })
    })
  }

  render() {
    return <div>Google Auth</div>
  }
};

export default GoogleAuth;
