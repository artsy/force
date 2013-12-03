var tmpl = function() { require('./template2.jade').apply(this, arguments) };
module.exports = function() {
  return tmpl({ title: 'A foo walks into a bar.' });
}