##Share

This component produces a button which looks like this:

![share_button](http://content.screencast.com/users/kanaabe/folders/Jing/media/625ada33-8114-433d-8b39-6e01f565031e/00000006.png)

When clicked, it shows a nav bar which looks like this:

![share_nav](http://content.screencast.com/users/kanaabe/folders/Jing/media/ac8a0ada-baef-464b-b3a0-59725ceae385/00000007.png)

###Usage
1. Add the view to the client JS by including the component. 
```
ShareView = require '../../components/share/view.coffee'
```

2. Instantiate the component and add settings
    
el: **Element** which should hold the share button and nav bar

imageUrl: **String**  

description: **String** which is used as the description for Twitter and Pinterest sharing

Below is an example:

```coffeescript
initialize: (options) ->
  new ShareView 
    el: @$('.show-share'), 
    imageUrl: @model.imageUrl('large'), 
    description: if @model.get('partner') then '"' + @model.get('name') + '" at ' + encodeURIComponent(@model.get('partner').name) + ' @artsy' else @model.get('name') + ' @artsy'
```
3. Add the component to the appropriate asset file 

written by @kanaabe
and @gristleism