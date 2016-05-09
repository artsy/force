# If this proves to be a successful strategy and grows past $a_reasonable_amount then
# consider moving this data into the actual API response
module.exports =

  metaOverrides: (tag) ->
    metaOverrides(this)[@id]?[tag]

  toPageTitle: ->
    if title = @metaOverrides('title')
      title
    else
      @defaultMetaTitle?() or (@get('title') or @get('name') + " | Artsy")

  toPageDescription: (length = 200) ->
    if description = @metaOverrides('description')
      description
    else if @.constructor.name is 'Fair'
      "Browse artworks, artists and exhibitors from #{@get('name')} on Artsy."
    else
      @defaultMetaDescription?(length) or @get('title') or @get('name')


metaOverrides = (model) ->

  'zsona-maco-2016':
    title: 'ZsONA MACO 2016 | Artsy'
    description: 'Browse works by leading contemporary artists—Rachel Howard, Candida Höfer, and Jose Dávila included—shown in Mexico’s Distrito Federal'

  'art-rotterdam-2016':
    title: 'Art Rotterdam 2016 | Artsy'
    description: 'Preview work by up-and-coming artists—Evren Tekinoktay, Catherine Parsonage, and Mahmoud Bakhshi among them—at this fair in Rotterdam'

  'fog-design-plus-art-2016':
    title: 'FOG Art + Design 2016 | Artsy'
    description: 'Amid a burgeoning West Coast art scene, preview this fair of 43+ dealers—Marian Goodman Gallery, David Gill Gallery, and Salon 94 among them—from the Bay Area and beyond.'

  'art-stage-singapore-2016':
    title: 'Art Stage Singapore  2016 | Artsy'
    description: 'Explore work from Asia and beyond as 140+ regional and international galleries—Tomio Koyama Gallery, Whitestone Gallery, and amanasalto among them—gather in Singapore.'

  'art-los-angeles-contemporary-2016':
    title: 'Art Los Angeles Contemporary 2016 | Artsy'
    description: 'Find out which works The Hole, MOT International, and Galerie Christina Lethert are bringing to the West Coast.'

  'design-miami-2015':
    title: 'Design Miami/ 2015 | Artsy'
    description: 'From established modernists to emerging desginers, your first look at the preeminent design fair in Miami'

  'art-basel-in-miami-beach-2015':
    title: 'Art Basel in Miami Beach 2015 | Artsy'
    description: 'Find out what Paul Kasmin Gallery, KÖNIG GALERIE, ShanghART Gallery, and others are bringing to Miami Beach for the 14th U.S. edition of the renowned Swiss fair'

  'focus-miami-2015':
    title: 'Art Miami / Satellite Fairs 2015 | Artsy'
    description: 'Explore our extensive coverage of Miami Art Week with highlights from the leading events happening in South Beach'

  'abu-dhabi-art-2015':
    title: 'Abu Dhabi Art 2015 | Artsy'
    description: 'Discover works from emerging and established galleries—including Hauser & Wirth, Acquavella, and The Third Line—soon to be on view in the United Arab Emirates’ capital.'

  'art021-2015':
    title: 'Art021 Shanghai Contemporary Art Fair 2015 | Artsy'
    description: 'Browse work by the international artists—Zhao Zhao, Sabine Moritz, and Callum Innes among them—on view at this rising Shanghai fair.'

  '1-54-london-2015':
    title: '1:54 Contemporary African Art Fair 2015 | Artsy'
    description: 'Browse galleries hailing from 20+ cities—from Tiwani Gallery in London to KooVha Gallery in Harare—showcasing a wide range of art from Africa and beyond.'

  'art-toronto-2015':
    title: 'Art Toronto 2015 | Artsy'
    description: 'Discover artwork from Canada\'s leading galleries—Nikola Rukaj Gallery, Rebecca Hossack Gallery, and Galerie d\'Este among them—at Art Toronto.'

  'art-taipei-2015':
    title: 'Art Taipei 2015 | Artsy'
    description: 'Browse works by leading Asian contemporary artists—including Chen Wei, Yayoi Kusama, and Geng Jianyi—at one of Asia’s longest-standing art fairs.'

  'ifpda-2015':
    title: 'IFPDA 2015 | Artsy'
    description: 'Your first look at prints by old masters and leading contemporary artists—Chris Ofili and Albrecht Dürer among them—at this unique fair dedicated to printmaking.'

  'artissima-2015':
    title: 'Artissima 2015 | Artsy'
    description: 'Explore works by leading contemporary artists—including Amina Benbouchta, Graham Wilson, and Evan Robarts—before the Torino fair opens its doors.'

  'contemporary-istanbul-2015':
    title: 'Contemporary Istanbul 2015 | Artsy'
    description: 'Celebrating 10 years, the international fair brings works by contemporary artists—including Mehmet Güleryüz, Elisabeeth Lecourt, and Csaba Fürjesi—to the Turkish city.'

  'the-salon-ny':
    title: 'Salon: Art + Design 2015 | Artsy'
    description: '55 international galleries, hailing from Paris to Rome, bring their finest design works to New York\'s Park Avenue Armory.'

  'unseen-photo-fair-2015':
    title: 'Unseen Photo Fair 2015 | Artsy'
    description: 'Your first look at the Amsterdam fair celebrating photography in all its forms—with works by Erwin Olaf, Letha Wilson, Christto & Andrew, and more.'

  'viennacontemporary-2015':
    title: 'viennacontemporary 2015 | Artsy'
    description: 'Preview the works on display in the Austrian capital by artists including Marina Abramović, Günther Förg, and Imi Knoebel.'

  'zona-maco-foto-and-zona-maco-sal-n-del-anticuario-2015':
    title: 'ZsONA MACO: FOTO and SALÓN DEL ANTICUARIO 2015 | Artsy'
    description: 'Preview prized photographs and antiques from local and international galleries gathering in Mexico City.'

  'artbo-2015':
    title: 'ArtBO 2015 | Artsy'
    description: 'Preview Bogotá\’s global art fair, featuring local and international talent including works by Yeni & Nan, Jesús Rafael Soto, and Niki de Saint Phalle.'

  'kiaf-2015':
    title: 'KIAF 2015 | Artsy'
    description: 'U-Ram Choe, Eva Armisen, and Park Seo Bo are among the leading Asian artists to discover at the 14th edition of this fair.'

  'frieze-london-2015':
    title: 'Frieze London 2015 | Artsy'
    description: 'Browse work by up-and-coming and iconic artists at this touchstone of the contemporary art world featuring over 160 international galleries.'

  'frieze-masters-2015':
    title: 'Frieze Masters 2015 | Artsy'
    description: 'View historic and modern masterworks by Egon Schiele, Yves Klein, and Sam Gilliam displayed at the fair.'

  'chart-art-fair-2015':
    title: 'CHART Art Fair 2015 | Artsy'
    description: 'Browse artwork from select Nordic galleries at the third edition of the fair in Copenhagen.'

  'artinternational-2015':
    title: 'ArtInternational 2015 | Artsy'
    description: 'Explore work from over 85 international galleries converging in Istanbul, a city bridging East and West.'

  'moving-image-istanbul-2015':
    title: 'Moving Image Istanbul 2015 | Artsy'
    description: 'Discover video, film, and digital artwork from 22 select exhibitors at the fair\'s second edition in the city.'

  'west-bund-art-and-design-2015':
    title: 'Westbund Art + Design 2015 | Artsy'
    description: 'Discover highlights from the second edition of China\'s influential art and design fair, bringing top international galleries to the Bund on Shanghai\'s Xuhui Waterfront.'

  'photo-shanghai-2015':
    title: 'Photo Shanghai 2015 | Artsy'
    description: 'Preview photographs by Britta Jaschinski, Li Wei, and Henri Cartier-Bresson before the opening of the Asia-Pacific\'s first international fair dedicated to photography.'

  'sydney-contemporary-2015':
    title: 'Sydney Contemporary 2015 | Artsy'
    description: 'Explore a swath of artists—including Rhys Lee, Saskia Folk, and Fiona Hall—at Australia\'s largest multi-arts center.'

  'artrio-2015':
    title: 'ArtRio 2015 | Artsy'
    description: 'Browse works by established and up-and-coming artists—such as Gisele Camargo, Alejandro Ospina, and Chico Togni—on display side by side at this highly anticipated fair.'

  'ida-2015':
    title: 'IDA 2015 | Artsy'
    description: 'Get a first look at the main design art event in Brazil, now in its second iteration.'

  'fnb-joburgartfair-2015':
    title: 'FNB JoburgArtFair 2015 | Artsy'
    description: 'Explore the first international art fair on the African continent, which plays a pivotal role in supporting the burgeoning contemporary arts landscape in Africa.'

  'cosmoscow-2015':
    title: 'Cosmoscow 2015 | Artsy'
    description: 'A first look at works by artists—including Pavel Pepperstein, Olga Bulgakova, and Alex Katz—on display at Russia\'s only international contemporary fair.'

  'nada-new-york-2015':
    title: 'NADA New York 2015 | Artsy'
    description: 'Explore young galleries and artists to watch at NADA New York on Artsy.net.'

  'collective-design-2015':
    title: 'Collective Design 2015 | Artsy'
    description: 'Browse Collective Design\'s curated selection of contemporary design and historical pieces online exlucisvely at Artsy.net.'

  'frieze-new-york-2015':
    title: 'Frieze New York 2015 | Artsy'
    description: 'Frieze New York brings together contemporary galleries from around the world—browse works from the fair at Artsy.net.'

  '1-54-contemporary-african-art-fair-new-york-2015':
    title: '1:54 New York 2015 | Artsy'
    description: 'Explore the first New York pop-up of the London-based 1:54 Contemporary African Art Fair online exclusively at Artsy.net.'

  'art15':
    title: 'Art15 | Artsy'
    description: 'Browse the third edition of London\'s global art fair featuring galleries from over 40 countries online exclusively at Artsy.net.'

  'granpalazzo-2015':
    title: 'GRANPALAZZO 2015 | Artsy'
    description: 'GRANPALAZZO showcases galleries in Palazzo Rospigliosi, just outside Rome in Zagarolo — explore works from the fair online at Artsy.net.'

  'arteba-2015':
    title: 'arteBA 2015 | Artsy'
    description: 'Explore arteBA, Argentina\'s international contemporary art fair in Buenos Aires—featuring galleries from the region—online exclusively at Artsy.net.'

  'loop-barcelona-2015':
    title: 'LOOP Barcelona 2015 | Artsy'
    description: 'Browse video art and film work from artists around the world showing at LOOP Barcelona online exclusively at Artsy.net.'

  'design-miami-basel-2015':
    title: 'Design Miami/ Basel 2015 | Artsy'
    description: 'Browse Design Miami/ Basel, the global forum for 20th- and 21st-century collectible design at the Messeplatz, online exclusively at Artsy.net.'

  'art-basel-2015':
    title: 'Art Basel 2015 | Artsy'
    description: 'Explore Art Basel—see modern and contemporary works from galleries around the world online at Artsy.net.'

  'liste-2015':
    title: 'LISTE 2015 | Artsy'
    description: 'Browse young galleries and work by emerging contemporary artists at LISTE online at Artsy.net.'

