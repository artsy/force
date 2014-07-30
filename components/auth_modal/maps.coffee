module.exports =
  templateMap:
    signup: -> require('./templates/signup.jade') arguments...
    login: -> require('./templates/login.jade') arguments...
    register: -> require('./templates/register.jade') arguments...
    forgot: -> require('./templates/forgot.jade') arguments...
    reset: -> require('./templates/reset.jade') arguments...

  stateEventMap:
    signup: 'Viewed sign up options'
    login: 'Viewed login form'
    register: 'Viewed register using email form'
    forgot: 'Viewed forgot password form'
    reset: 'Completed password reset'

  successEventMap:
    login: 'Successfully logged in'
    register: 'Created account'

  routeCopyMap:
    '/favorites':
      signup: null
      register: 'Sign up to save artworks'
      login: 'Login to save artworks'
    '/following/genes':
      signup: null
      register: null
      login: 'Log in to manage what you follow'
    '/following/artists':
      signup: null
      register: 'Sign up to follow artists'
      login: 'Log in to follow artists'
    '/following/profiles':
      signup: null
      register: 'Sign up to follow galleries and museums'
      login: 'Login to follow galleries and museums'
