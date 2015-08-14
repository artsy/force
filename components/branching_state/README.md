# Branching State

Useful object for configuring and managing multi-step, stateful views.

## Usage

```coffeescript
state = new State steps: ['first', 'second', 'third']

state.on 'next', (position) -> #

state.current() # => 'first'
state.next() # => 'second'
state.current() # => 'second'
state.next() # => 'third'
state.current() # => 'third'
state.next() # => 'third'
```

```coffeescript
configuration =
  decisions:
    initial_condition: ({ x, y }) ->
      x + y is 2
    final_condition: ({ user }) ->
      user.get('collector_level') is 3

  steps: [
    initial_condition:
      true: ['first', 'second', 'third']
      false: [
        'third'
        'second'
        'first'
        final_condition:
          true: ['something_else', 'end']
          false: ['end']
      ]
  ]


state = new State configuration

# Inject dependencies
[x, y] = [1, 2] # False
user = new Backbone.Model(collector_level: 3) # True
state.inject x: x, y: y, user: user

state.current() # => 'third'
state.next() # => 'second'
state.next() # => 'first'
state.next() # => 'something_else'
state.next() # => 'end'
```

```coffeescript
state = new State
  steps: ['first', 'second']
  views:
    first: require '../views/first.coffee'
    second: require '../views/second.coffee'

state.current() # => 'first'
# Construct FirstView
state.view(model: @model)

state.next() # => 'second'
# Construct SecondView
state.view(model: @model)
```
