import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { initializeApp } from './redux/contactsReducer';


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.isInit) {
      return (
        <Typography variant="h6" style={{textAlign: 'center'}}>
          Loading...
        </Typography>
      );
    }
    return (
      <div style={{flexGrow: 1}}>
        <Header/>
        <Container maxWidth='lg'>
          <Main/>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isInit: state.contacts.isInit
  };
};

export default connect(mapStateToProps, { initializeApp })(App);
