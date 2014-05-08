# Migration Challenges

This document will outline the challenges of migrating from the Gravity Rails app to Force such as how to handle features not built in Force yet.

## Cross Domain

If we need to support IE8 then we can't rely on CORs for cross-origin ajax requests. Our options are to either use an iframe hack like [Foursquare](http://engineering.foursquare.com/2011/12/08/web-sites-are-clients-too/) or to use node-http-proxy to proxy our local requests.

### Proxy solution

If we have to proxy the proper solution is to probably use relative paths like /api/v1 and edit the server-side sync to prepend the API_URL.

## Sharing Code

Now that Microgravity and Force have the same foundation it begs the question how much should we be sharing between the two? Model code may want to be extracted out into it's own node module, but that code may be too commonly updated and cause a lot of stepping on each other's toes.

## Falling back to Gravity

To sanely migrate we need a good strategy for migrating from Gravity to Force. Right now we're proxying unhandled urls to Gravity, but it doesn't throw you back once you're in Gravity because of it being thick-client without page refreshes.

### Martsy

Another challenge to this is Martsy, do we proxy Martsy like Gravity or do we redirect to Martsy? Proxying gives the benefit of keeping it under the same URL with the downside of unecessary server-load overhead. However without client-side redirecting pages cached on a CDN will serve the desktop version -- no good!

### SEO

Using an iframe will probably ruin SEO for unsupported pages. We have the opportunity here to use Zombie to capture the full html of Gravity pages and serve it to a crawler. Maybe that is out of the scope of this project.

## Look & Feel

Maintaining the same look and feel between the two apps is going to be tricky. There will be slightly different paddings and what not. Mostly this will only be a problem in layout code.

## Duplicated layout code

The search bar functionality and login/signup modals or anything else that works without a page refresh is going to be tricky to share, especially because Gravity's view code can be pretty coupled to the app by using globals like `App.foo` or styles scattered about many pieces.

## Sharing Auth

Gravity uses cookie based auth and Force needs an access token. The solution to this is most likely that when Gravity hits a Force route it does a full redirect passing the X-ACCESS-TOKEN in it's headers. Then Force can log the user in just like Microgravity logs the native app in.