require('./')({
  src: __dirname + '/test',
  transforms: [require('caching-coffeeify')],
  noParse: [
    require.resolve('./test/assets/jquery'),
    require.resolve('./test/assets/ember')
  ],
  insertGlobals: true
})(
  { url: '/assets/perf.js' },
  { send: function(){
      console.log("done")
      process.exit()
  } },
  function(){}
)