# Form

Handles form serialization, submission, validation and UI state handling. It's broken up into some sub-objects.

`Form`: Handles UI related state
`Serializer`: Takes the form jQuery object and pulls out data in a way that the API expects
`Validator`: Wrapper around HTML5 validation rules
`Errors`: Parses error messages/calls out individual fields when applicable

## Usage

```jade
form
  // Provide `name` attributes for your input fields
  input( name='full_name' )
  input( name='something_else' )
  button

```

```coffeescript
Form = require '../../components/form/index.coffee'

form = new Form model: @model, $form: $('form')

$('input[name="full_name"]').val 'My Name'
$('input[name="something_else"').val 'Some other value'

form.submit()

# `@model` saves...

@model.get('full_name') # => 'My Name'
```

```
Form = require '../../components/form/index.coffee'

class SomeView extends BackboneView
  submit: (e) ->
    e.preventDefault()

    form = new Form model: @model, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    @model.save form.serializer.data()
      success: ->
        form.state 'success'
      error: ->
        form.error arguments...
        alert 'Something went wrong!'
```

```coffeescript
# The other objects can be used independently of the form

serializer = new Serializer $('form')
serializer.data() # => { full_name: 'My Name', something_else: 'Some other value' }
```
