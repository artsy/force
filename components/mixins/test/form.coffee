benv  = require 'benv'
Form  = require '../form.coffee'

describe 'Form', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      @$form = $ """
        <form>
          <input name='name'>
          <input name='email' required>
          <textarea name='comment' required></textarea>
        </form>
      """
      done()

  afterEach ->
    benv.teardown()

  describe '#serializeForm', ->
    it 'should return all named inputs as keys regardless of values', ->
      Form.serializeForm(@$form).should.have.keys 'name', 'email', 'comment'

    it 'should return all values corresponding to keys', ->
      values = { name: 'Foo Bar', email: 'foo@bar.com', comment: 'Baz Qux Whatever' }
      @$form.find('input[name=name]').val values['name']
      @$form.find('input[name=email]').val values['email']
      @$form.find('textarea[name=comment]').val values['comment']
      Form.serializeForm(@$form).should.include values

  describe '#validateForm', ->
    it 'should check all required fields and set their state to error if they are empty', ->
      Form.validateForm(@$form)
      @$form.find(':input[required]').each ->
        $(this).data('state').should.equal 'error'
