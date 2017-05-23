module.exports = (id) ->
	"""
	{
		sale(id: "#{id}")
		 {
	    id
	    name
	    href
	  	cover_image {
	      cropped(width: 250 height: 165 version: "large_rectangle"){
	  			url
	      }
	  	}
	  }
	}
	"""