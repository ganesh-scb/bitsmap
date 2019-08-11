import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { isValidEmail, isValidPassword } from '../../helpers/validation.js';
import { login } from '../login/action.js';
import CoinMarket from '../coinmarket/index.js'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: '100%'
  },
  helperText: {
    fontSize: 12
  },
  buttonWrapper: {
    display: 'block'
  },
  signUpButton: {
    margin: theme.spacing(1),
  },
  loginButton: {
    margin: theme.spacing(1),
  }
});

class LoginForm extends React.Component {
  state = {
    userName: '',
    password: '',
    userNameIsError: false,
    passwordIsError: false,
    userNameExists: false,
    isLoggedIn: false,
  }
  handleChange = name => event => {
    const value = event.target.value.trim()
    let setObj = {
      [name]: value
    }
    if (name === 'userName') {
      setObj.userNameIsError = !isValidEmail(value)
      setObj.userNameExists = false
    }
    if (name === 'password') {
      setObj.passwordIsError = !isValidPassword(value)
    }
    this.setState(setObj)
  }
  onSignUOrLogin = type => {
    const payLoad = {
      userName: this.state.userName,
      password: this.state.password,
      type: type
    }
    login(payLoad, this.successCallBack, this.failureCallBack)
  }
  successCallBack = response => {
    if (response.data === 'loggedIn') {
      this.setState({
        isLoggedIn: true
      })
    }
  }
  failureCallBack = error => {
    if (error.response.data === 'User name already exists') {
      this.setState({
        userNameExists: true,
        userNameIsError: true
      })
    } else if (error.response.data === 'Unauthorized user.') {
      alert('Unauthorized user!')
    }
  }
  enableSubmit = () => {
    const { userName, password, userNameIsError, passwordIsError } = this.state
    return !(userName!== '' && password !== '' && !userNameIsError && !passwordIsError)
  }
  onLogout = () => {
    location.reload()
  }
  render() {
    const { classes } = this.props
    const { userName, password, userNameIsError, passwordIsError, userNameExists, isLoggedIn } = this.state
    return (
      <div className={classes.container}>
      {isLoggedIn ? (
        <div>
          <CoinMarket />
        </div>
      ) : (
        <div>
          <h1>Login to Bitsmap live trades</h1>
          <FormControl className={classes.formControl} error={userNameIsError}>
            <InputLabel htmlFor="userName">User Name</InputLabel>
            <Input id="userName" value={userName} onChange={this.handleChange('userName')} />
            <FormHelperText className={classes.helperText}>
              {userNameExists ? 'User name already exists' : 'Email ID'}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} error={passwordIsError}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              value={password}
              onChange={this.handleChange('password')}
              maxLength={6}
            />
            <FormHelperText className={classes.helperText}>Maximum 6 characters including atleast one special character of !, @, #, $ and one Number</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                className={classes.signUpButton}
                onClick={() => this.onSignUOrLogin('signUp')}
                disabled={this.enableSubmit()}
              >
                SignUp New User
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.loginButton}
                onClick={() => this.onSignUOrLogin('login')}
                disabled={this.enableSubmit()}
              >
                Login
              </Button>
            </div>
          </FormControl>
          </div>
        )}
        {isLoggedIn ? (
          <div>
            <Button
              variant="contained"
              className={classes.loginButton}
              onClick={this.onLogout}
            >
              Logout
            </Button>
          </div>
        ) : null }
      </div>
    )
  }
}
export default withStyles(styles)(LoginForm);
