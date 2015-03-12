
var fs = require('fs')
  , url = require('url')
  , querystring = require('querystring')
  , yaml = require('js-yaml')
  , path = require('path')
  ;

module.exports = Referer

var dataFile = fs.readFileSync(path.join(__dirname, 'data', 'referers.yml'))
var REFERERS = loadReferers(yaml.load(dataFile.toString()))

function loadReferers (source) {
  var referers_dict = {}

  for(var medium in source) {
    var conf_list = source[medium]

    for(var referer_name in conf_list) {
      var config = conf_list[referer_name]
      var params = null

      if(config.parameters) {
        params = config.parameters.map(function(p) { return p.toLowerCase() })
      }
      config.domains.forEach(function(domain){
        referers_dict[domain] = {
          'name': referer_name,
          'medium': medium
        }
        if(params){
          referers_dict[domain]['params'] = params
        }
      })
    }
  }
  return referers_dict
}

function Referer (referer_url, current_url, referers) {
  this.known = false
  this.referer = null
  this.medium = 'unknown'
  this.search_parameter = null
  this.search_term = null
  this.referers = referers || REFERERS

  var ref_uri = url.parse(referer_url)
  var ref_host = ref_uri.hostname
  this.known = Boolean(~['http:', 'https:'].indexOf(ref_uri.protocol))
  this.uri = ref_uri

  if(!this.known) return

  if(current_url){
    var curr_uri = url.parse(current_url)
    var curr_host = curr_uri.hostname

    if(curr_host == ref_host) {
      this.medium = 'internal'
      return
    }
  }

  var referer = this._lookup_referer(ref_host, ref_uri.pathname, true)
  if(!referer){
    referer = this._lookup_referer(ref_host, ref_uri.pathname, false)
    if(!referer){
      this.medium = 'unknown'
      return
    }
  }

  this.referer = referer['name']
  this.medium = referer['medium']

  if(referer['medium'] == 'search') {
    if(!referer['params']) return

    var pqs = querystring.parse(ref_uri.query)

    for(var param in pqs) {
      var val = pqs[param]

      if(referer['params'].indexOf(param.toLowerCase()) !== -1) {
        this.search_parameter = param
        this.search_term = val
      }
    }
  }
}

Referer.prototype._lookup_referer = function(ref_host, ref_path, include_path) {
  // console.log(ref_host, ref_path, include_path)
  var referer = null

  if(include_path)
    referer = this.referers[ref_host + ref_path]
  else
    referer = this.referers[ref_host]
  if(!referer) {
    if(include_path){
      var path_parts = ref_path.split('/')
      if(path_parts.length > 1) {
        try {
          referer = this.referers[ref_host + '/' + path_parts[1]]
        } catch (e) {

        }
      }
    }
  }

  if(!referer) {
    try{
      var idx = ref_host.indexOf('.')
      if(idx === -1) return null

      var slicedHost = ref_host.slice(idx + 1)
      return this._lookup_referer(
          slicedHost,
          ref_path, include_path
      )
    } catch (e) {
      console.error(e)
      return null
    }
  } else return referer
};

// var r = new Referer("http://www.google.com/search?q=gateway+oracle+cards+denise+linn&hl=en&client=safari")
// console.log(r.uri)