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
    else
      @defaultMetaDescription?(length) or @get('title') or @get('name')


metaOverrides = (model) ->

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

  'cindy-sherman':
    title: "Cindy Sherman - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Cindy Sherman, including artwork for sale, her latest shows & events, biography, and exclusive Cindy Sherman articles.'

  'alec-monopoly':
    title: 'Alec Monopoly prints & art for sale (with prices) on Artsy'
    description: 'Find the best Alec Monopoly art for sale, and explore his current shows, events & biography. Street artist Alec Monopoly takes ...'

  'chuck-close':
    title: "Chuck Close - #{model.get('published_artworks_count')} Artworks, Biography & more on Artsy"
    description: 'Find the best of Chuck Close including his biography, paintings & prints for sale, shows and articles on Artsy. Chuck Close reinvented painting with his monumental portraits...'

  'jeff-koons':
    title: "Jeff Koons Art - #{model.get('published_artworks_count')} Artworks, Biography & Articles on Artsy"
    description: 'Welcome to the official Jeff Koons page on Artsy. Jeff Koons plays with ideas of taste, pleasure, celebrity, and commerce. “I believe in advertisement and media completely” ...'

  'jenny-saville':
    title: 'Jenny Saville - Paintings, Drawings & More on Artsy'
    description: 'Browse Jenny Saville paintings, drawings, biographical information, and upcoming shows. Jenny Saville paints female nudes in extreme states of grotesque exaggeration...'

  'barbara-kruger':
    title: "Barbara Kruger Art - #{model.get('published_artworks_count')} Artworks, Bio & more on Artsy"
    description: 'Best known for laying aggressively directive slogans over black-and-white photographs that she finds in magazines, Barbara Kruger developed a visual language that was strongly influenced by her early work as...'

  'hannah-hoch':
    title: 'Hannah Hoch - Collages & other Artwork on Artsy'

  'andreas-gursky':
    title: 'Andreas Gursky - Photographs, Biography & more on Artsy'

  'zaria-forman':
    title: 'Zaria Forman - Prints & paintings for sale (with prices) on Artsy'
    description: 'Find the best collection of Zaria Forman art, including paintings & prints for sale. Explore her biography, current shows, and articles. Zaria Forman’s pristine, photorealist paintings...'

  'william-eggleston':
    title: 'William Eggleston - Photographs, Prints & More on Artsy'
    description: 'Browse the best of William Eggleston photography, including artwork & prints for sale, upcoming shows, his biography, and exclusive William Eggleston articles.'

  'paul-strand':
    title: 'Paul Strand (Photographer) - His Works, Bio & Shows on Artsy'
    description: 'Paul Strand was one of the defining masters of early American modernist photography. In the early 20th century Strand began taking the photographs for which...'

  'damien-hirst':
    title: "Damien Hirst - View #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Damien Hirst, including his works & prints for sale, shows, collections, exclusive articles, and related artists on Artsy. Damien Hirst first came to public attention in London...'

  'alexander-calder':
    title: "Alexander Calder - View #{model.get('published_artworks_count')} Artworks, his bio & more on Artsy"
    description: 'American artist Alexander Calder changed the course of modern art by developing a method of bending and twisting wire to create three-dimensional “drawings in space.” '

  'takashi-murakami':
    title: "Takashi Murakami Art - #{model.get('published_artworks_count')} Artworks, Prints & more on Artsy"
    description: "Find the best of Takashi Murakami, including prints, paintings & sculptures. Read his biography & browse his latest shows & exclusive articles on Artsy."

  'riusuke-fukahori':
    title: 'Riusuke Fukahori - Artworks, Bio & more on Artsy'
    description: 'Browse the best of Riusuke Fukahori, including artwork for sale, his latest shows & events, biography, and exclusive Riusuke Fukahori articles on Artsy.'

  'jean-michel-basquiat':
    title: "Jean-Michel Basquiat - #{model.get('published_artworks_count')} Artworks, Bio & Shows on Artsy"
    description: 'A poet, musician, and graffiti prodigy in late-1970s New York, Jean-Michel Basquiat had honed his signature painting style of obsessive scribbling, elusive symbols...'

  'kiki-kogelnik':
    title: 'Kiki Kogelnik - Paintings, Prints, Biography & Shows on Artsy'
    description: 'Browse the best of Kiki Kogelnik (Austrian, 1935-1997), including her artworks, current shows, biography, and exclusive Kiki Kogelnik articles.'

  'sister-mary-corita-kent':
    title: 'Sister Mary Corita Kent - Her Artworks & Biography on Artsy'
    description: 'Browse the best of Sister Mary Corita Kent, including her biography, artwork for sale, exclusive Corita Kent articles & more. A contemporary of Andy Warhol and Ed Ruscha...'

  'vik-muniz':
    title: "Vik Muniz - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Vik Minuz, including his biography, artwork & prints for sale, upcoming shows, and exclusive Vik Muniz articles. Photographer and mixed-media artist Vik Muniz is best known for ...'

  'blek-le-rat':
    title: "Blek Le Rat - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Blek le Rat, including his works & prints for sale, exclusive articles, and related artists. Blek Le Rat counts the infamous Banksy among his many admirers.'

  'john-currin':
    title: "John Currin - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of John Currin, including paintings & other artworks for sale, his biography, the latest shows & events, and exclusive John Currin articles.'

  'ai-weiwei':
    title: "Ai Weiwei - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Find the best of Ai Weiwei art, including his sculptures, installations & more. Read about Ai Weiwei & browse his latest shows & exclusive articles on Artsy.'

  'jim-dine':
    title: "Jim Dine - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Find the best of Jim Dine - his artworks (including Hearts & Robes) & prints for sale, current shows & more. Emerging as a pioneer of New York’s Happenings of the 1960s, Jim Dine...'

  'alex-katz':
    title: "Alex Katz - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Alex Katz, including his paintings, prints for sale, exclusive articles, upcoming shows & more. New York School painter Alex Katz developed his highly stylized aesthetic in reaction to...'

  'richard-serra':
    title: "Richard Serra - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Richard Serra, including his artwork & prints for sale, upcoming shows, his biography, and exclusive Richard Serra articles. The monumental sculptures of Richard Serra...'

  'andy-warhol':
    title: "Andy Warhol Art - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Andy Warhol art, including paintings and artwork for sale (with prices), upcoming shows, and exclusive Andy Warhol articles on Artsy.'

  'tauba-auerbach':
    title: 'Tauba Auerbach - Her Artworks, Bio & Shows on Artsy'
    description: 'Browse the best of Tauba Auerbach, including her artwork & prints for sale, upcoming shows, biography & exclusive Tauba Auerbach articles. Tauba Auerbach is best known for her Op art-inflected paintings that play with perceptions of space.'

  'lucien-smith':
    title: "Lucien Smith - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Browse the best of Lucien Smith, including his Rain paintings series, upcoming shows, biography & exclusive Lucien Smith articles. Lucien Smith creates work that traverses a spectrum of styles...'

  'fernando-botero':
    title: "Fernando Botero - #{model.get('published_artworks_count')} Artworks, Bio & Shows on Artsy"
    description: 'Find the best of Fernando Botero, including paintings, sculptures & prints for sale, his biography & more on Artsy. Drawing inspiration from a diverse array of influences, from ...'

  'retna':
    title: "Retna – #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Explore the bio, art, and shows of street, graffiti, and studio artist Retna, a.k.a. Marquis Lewis. Browse works for sale (including prints) and more.'

  'robert-rauschenberg':
    title: "Robert Rauschenberg - #{model.get('published_artworks_count')} Artworks, Bio & Shows on Artsy"

  'banksy':
    title: "Banksy – #{model.get('published_artworks_count')} Artworks, Prints for sale, Bio & More on Artsy"
    description: 'Find the best of Banksy, including his biography, art for sale, current shows, and exclusive Banksy articles on Artsy. Banksy creates street art with an irreverent wit ...'

  'sol-lewitt':
    title: "Sol Lewitt – #{model.get('published_artworks_count')} Works (Prints, Drawings & More) on Artsy"
    description: 'Browse the best of Sol Lewitt, including his artwork & prints for sale, upcoming shows, biography & exclusive Sol Lewitt articles on Artsy. One of the leading exponents of Conceptual art, Sol LeWitt...'

  'kiki-smith':
    title: "Kiki Smith - #{model.get('published_artworks_count')} Artworks, Biography & Shows on Artsy"
    description: 'Find the best of Kiki Smith art, including sculptures & prints for sale. Explore her biography, current shows, and articles on Artsy. Kiki Smith’s collections are meditations on life and spirituality...'

  'david-lachapelle':
    title: "David LaChapelle - #{model.get('published_artworks_count')} Artworks, Bio & Shows on Artsy"
    description: 'Find the best of David LaChapelle, including photographs, prints for sale, his biography, current shows, and articles on Artsy. Discovered by Andy Warhol at the age of 17...'
  