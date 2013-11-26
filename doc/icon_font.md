# Editing the icon font

All interface icons should be added to the icon font 'artsy'. The font is currently managed through the service http://icomoon.io/ (The login can be found in KeePass).

*TODO: Add information about hinting and setting up grid*

Once you have your vector art ready:

* Ensure there's an editable SVG saved in `/public/images/svg`
* Login to IcoMoon
  * The project is titled 'Artsy'
* In the project icons are grouped into categories; currently 'Interface', 'Social', and 'Identity'
  * Import your SVGs to the appropriate sets
* Click through to 'Font', edit any of the names and 'Download'
  * This will provide you with a `.zip` file containing the font files (`.eot`, `.svg`, `.ttf`, `.woff`) and CSS
    * Replace font files in `public/fonts/`
    * Append the new icon classes to `components/main_layout/stylesheets/icons.styl`
