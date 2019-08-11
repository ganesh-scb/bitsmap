import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LoginForm from './components/login/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth="xl">
          <LoginForm />
        </Container>
      </div>
    );
  }
}

export default App;
