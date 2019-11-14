import React from 'react';
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'


class GoogleAuth extends React.Component {

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      )
    }
  }
  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '727962166634-e32mlaj9opmv4nt9nnacs9uulgs0cl7f.apps.googleusercontent.com',
        scope: 'email '
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  onAuthChange = (isSignedIn) => { // so context is bound to component, since it's a callback
    if (isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }
  }

  onSignInClick = () => {
    this.auth.signIn(this)
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
