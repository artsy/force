# Example errors encounted in the wild and the messages they should be transformed into
module.exports =
  [
    { error: """{"type":"param_error","message":"Email is invalid,Password is too short (minimum is 6 characters).","detail":{"email":["is invalid"],"password":["is too short (minimum is 6 characters)"]}}""", message: 'Email is invalid; Password is too short (minimum is 6 characters)' }
    { error: """{"type":"param_error","message":"Password is too short (minimum is 6 characters).","detail":{"password":["is too short (minimum is 6 characters)"]}}""", message: 'Password is too short (minimum is 6 characters)' }
    { error: """{"error":"User Already Exists"}""", message: 'User Already Exists' },
    { error: """{"error":"User Already Exists","text":"A user with this email has already signed up with Twitter.","providers":["Twitter"]}""", message: 'A user with this email has already signed up with Twitter.' }
    { error: """{"error":"User Already Exists","text":"A user with this email has already signed up with Facebook.","providers":["Facebook"]}""", message: 'A user with this email has already signed up with Facebook.' }
    { error: """{"error":{"message":"invalidemailorpassword","stack":""}}""", message: 'invalidemailorpassword' }
    { error: """{"type":"param_error","message":"Handle is too short (minimum is 3 characters),Handle can only have letters, numbers, '-', and '_'.","detail":{"handle":["is too short (minimum is 3 characters)","can only have letters, numbers, '-', and '_'"]}}""", message: "Handle is too short (minimum is 3 characters); can only have letters, numbers, '-', and '_'" }
    { error: """{"type":"other_error","message":"hostname \"api.mailchimp.com\" does not match the server certificate","backtrace":[]}""", message: 'There was an error' }
    { error: """{"type":"param_error","message":"Password confirmation doesn't match Password.","detail":{"password_confirmation":["doesn't match Password"]}}""", message: "Password confirmation doesn't match Password" }

  ]
