import React from 'react';

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I dont know if we are signed in</div>
    } else if (this.state.isSignedIn){
      return <div>I am signed in</div>
    } else {
      return <div>I am not signed in</div>
    }
  }
  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '727962166634-e32mlaj9opmv4nt9nnacs9uulgs0cl7f.apps.googleusercontent.com',
        scope: 'email '
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })

        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  onAuthChange = () => { // so context is bound to component, since it's a callback
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
};

export default GoogleAuth;
