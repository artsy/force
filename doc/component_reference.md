# Component Reference

Please add your components here with a description of how to use them.
If a separate doc is required, add it to the component's directory as a
`README.md` and create a link to it here.

- [Artwork Columns](#artwork-columns)
- [Artwork Item](#artwork-item)
- [Garamond Tab List](#garamond-tab-list)
- [Profile Badge](#profile-badge)

---

## Artwork Columns <a name="artwork-columns"></a>
![](images/artwork_columns.png)

---

## Artwork Item <a name="artwork-item"></a>
![](images/artwork_item.png)

AKA "ol' reliable", this view is a work horse and will have a place on any page
that displays artwork.

---

## Garamond Tab List <a name="garamond-tab-list"></a>
![](images/garamond_tab_list.png)

Defined in `components/main_layout/stylesheets/navigation.styl`
Example:
```jade
.garamond-tablist
  a.garamond-tab.is-active( href="/artist/#{artist.id}" ) Active Tab
  span.garamond-tab-separator
  a.garamond-tab( href="/artist/#{artist.id}" ) Inactive Tab
```
The tab seperator will add a slash as an image. Can alternatively be used with 
other seperators typically wrapped in a span (to keep links displayed inline).

##### Uses: 
- Featured Partners [/partners](http://artsy.net/parnters), [/galleries](http://artsy.net/galleries), 
[/institutions](http://artsy.net/institutions)
- Partner Profiles [/guggenheim](http://artsy.net/guggenheim)

---

## Profile Badge <a name="profile-badge"></a>
![](images/profile_badge.png)

This component displays linked profile icons with a profile owner's name. Different
sizes and orientations can be achieved with CSS. If a common size / style setup emerges,
it should be added to `components/profile_badge/index.styl`.

Example (see `apps/artist/templates/related_posts.jade`):
```jade
- var profile = post.profile()
li.artist-related-post
  a.artist-related-post-content( href="/post/#{post.get('id')}" )
    if post.get('title')
      .arpc-title
        != post.get('title')
    if post.get('summary')
      .arpc-body
        != post.get('summary')

  unless profile.isNew()
    .artist-related-post-profile
      include ../../../components/profile_badge/template
```
Add a reference to the component's stylus file in the app's asset package and override
as needed.

```stylus
@import '../components/main_layout/stylesheets'
@import '../components/modal'
@import '../components/feedback'
@import '../components/auth_modal'
@import '../components/fillwidth_row'
@import '../components/tooltips'
@import '../components/profile_badge' // <-- ref to the component stylus
@import '../apps/artist/stylesheets'
```
See `apps/artist/stylesheets/index.styl` for an example of a customized layout
```stylus
.artist-related-post-profile
  text-align center
  vertical-align middle
  width 150px
  .profile-badge-icon
    display inline-block
    width 72px
    height 72px
  .profile-badge-name
    font-size 10px
    text-align center
```
##### Uses: 
- Artist Pages - Featured Posts [/artist/andy-warhol](http://artsy.net/artist/andy-warhol)
- Partner Shows [/show/](http://artsy.net/parnters)
---
