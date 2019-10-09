module.exports =
  urlMap:
    signup: '/sign_up'
    login: '/log_in'
    register: '/sign_up'
    forgot: '/forgot'
    reset: '/forgot'

  templateMap:
    signup: -> require('./templates/signup.pug') arguments...
    login: -> require('./templates/login.pug') arguments...
    register: -> require('./templates/register.pug') arguments...
    forgot: -> require('./templates/forgot.pug') arguments...
    reset: -> require('./templates/reset.pug') arguments...

  stateEventMap:
    signup: 'Viewed sign up options'
    login: 'Viewed login form'
    register: 'Viewed register using email form'
    forgot: 'Viewed forgot password form'
    reset: 'Completed password reset'

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
    '/works-for-you':
      signup: null
      register: null
      login: 'Login to see works by artists you follow'
