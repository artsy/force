# If this proves to be a successful strategy and grows past $a_reasonable_amount then
# consider moving this data into the actual API response
module.exports =

  metaOverrides: (tag) ->
    metaOverrides[@id]?[tag]

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


metaOverrides =
  'art-brussels-2015':
    title: 'Most ballin art fair ever'
    description: 'act like you know'

  'nada-new-york-2015':
    title: 'NADA New York 2015 | Artsy is the best'
    description: 'Explore young galleries and artists to watch at NADA New York on Artsy.net.'

  'cindy-sherman':
    title: 'Cindy Sherman - Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Cindy Sherman, including artwork for sale, her latest shows & events, biography, and exclusive Cindy Sherman articles.'

  'alec-monopoly':
    title: 'Alec Monopoly prints & art for sale (with prices) on Artsy'
    description: 'Find the best Alec Monopoly art for sale, and explore his current shows, events & biography. Street artist Alec Monopoly takes ...'

  'chuck-close':
    title: 'Chuck Close - 202 Artworks, Biography & more on Artsy'
    description: 'Find the best of Chuck Close including his biography, paintings & prints for sale, shows and articles on Artsy. Chuck Close reinvented painting with his monumental portraits...'

  'jeff-koons':
    title: 'Jeff Koons Art - 142 Artworks, Biography & Articles on Artsy'
    description: 'Welcome to the official Jeff Koons page on Artsy. Jeff Koons plays with ideas of taste, pleasure, celebrity, and commerce. “I believe in advertisement and media completely” ...'

  'jenny-saville':
    title: 'Jenny Saville - Paintings, Drawings & More on Artsy'
    description: 'Browse Jenny Saville paintings, drawings, biographical information, and upcoming shows. Jenny Saville paints female nudes in extreme states of grotesque exaggeration...'

  'barbara-kruger':
    title: 'Barbara Kruger Art - 39 Artworks, Bio & more on Artsy'
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
    title: 'Damien Hirst - View 529 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Damien Hirst, including his works & prints for sale, shows, collections, exclusive articles, and related artists on Artsy. Damien Hirst first came to public attention in London...'

  'alexander-calder':
    title: 'Alexander Calder - View 195 Artworks, his bio & more on Artsy'
    description: 'American artist Alexander Calder changed the course of modern art by developing a method of bending and twisting wire to create three-dimensional “drawings in space.” '

  'takashi-murakami':
    title: 'Takashi Murakami Art - 147 Artworks, Prints & more on Artsy'
    description: "Find the best of Takashi Murakami, including prints, paintings & sculptures. Read his biography & browse his latest shows & exclusive articles on Artsy."

  'riusuke-fukahori':
    title: 'Riusuke Fukahori - Artworks, Bio & more on Artsy'
    description: 'Browse the best of Riusuke Fukahori, including artwork for sale, his latest shows & events, biography, and exclusive Riusuke Fukahori articles on Artsy.'

  'jean-michel-basquiat':
    title: 'Jean-Michel Basquiat - 66 Artworks, Bio & Shows on Artsy'
    description: 'A poet, musician, and graffiti prodigy in late-1970s New York, Jean-Michel Basquiat had honed his signature painting style of obsessive scribbling, elusive symbols...'

  'kiki-kogelnik':
    title: 'Kiki Kogelnik - Paintings, Prints, Biography & Shows on Artsy'
    description: 'Browse the best of Kiki Kogelnik (Austrian, 1935-1997), including her artworks, current shows, biography, and exclusive Kiki Kogelnik articles.'

  'sister-mary-corita-kent':
    title: 'Sister Mary Corita Kent - Her Artworks & Biography on Artsy'
    description: 'Browse the best of Sister Mary Corita Kent, including her biography, artwork for sale, exclusive Corita Kent articles & more. A contemporary of Andy Warhol and Ed Ruscha...'

  'vik-muniz':
    title: 'Vik Muniz - 122 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Vik Minuz, including his biography, artwork & prints for sale, upcoming shows, and exclusive Vik Muniz articles. Photographer and mixed-media artist Vik Muniz is best known for ...'

  'blek-le-rat':
    title: 'Blek Le Rat - 35 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Blek le Rat, including his works & prints for sale, exclusive articles, and related artists. Blek Le Rat counts the infamous Banksy among his many admirers.'

  'john-currin':
    title: 'John Currin - 50 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of John Currin, including paintings & other artworks for sale, his biography, the latest shows & events, and exclusive John Currin articles.'

  'ai-weiwei':
    title: 'Ai Weiwei - 94 Artworks, Biography & Shows on Artsy'
    description: 'Find the best of Ai Weiwei art, including his sculptures, installations & more. Read about Ai Weiwei & browse his latest shows & exclusive articles on Artsy.'

  'jim-dine':
    title: 'Jim Dine - 196 Artworks, Biography & Shows on Artsy'
    description: 'Find the best of Jim Dine - his artworks (including Hearts & Robes) & prints for sale, current shows & more. Emerging as a pioneer of New York’s Happenings of the 1960s, Jim Dine...'

  'alex-katz':
    title: 'Alex Katz - 188 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Alex Katz, including his paintings, prints for sale, exclusive articles, upcoming shows & more. New York School painter Alex Katz developed his highly stylized aesthetic in reaction to...'

  'richard-serra':
    title: 'Richard Serra - 148 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Richard Serra, including his artwork & prints for sale, upcoming shows, his biography, and exclusive Richard Serra articles. The monumental sculptures of Richard Serra...'

  'andy-warhol':
    title: 'Andy Warhol Art - 662 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Andy Warhol art, including paintings and artwork for sale (with prices), upcoming shows, and exclusive Andy Warhol articles on Artsy.'

  'tauba-auerbach':
    title: 'Tauba Auerbach - Her Artworks, Bio & Shows on Artsy'
    description: 'Browse the best of Tauba Auerbach, including her artwork & prints for sale, upcoming shows, biography & exclusive Tauba Auerbach articles. Tauba Auerbach is best known for her Op art-inflected paintings that play with perceptions of space.'

  'lucien-smith':
    title: 'Lucien Smith - 31 Artworks, Biography & Shows on Artsy'
    description: 'Browse the best of Lucien Smith, including his Rain paintings series, upcoming shows, biography & exclusive Lucien Smith articles. Lucien Smith creates work that traverses a spectrum of styles...'

  'fernando-botero':
    title: 'Fernando Botero - 116 Artworks, Bio & Shows on Artsy'
    description: 'Find the best of Fernando Botero, including paintings, sculptures & prints for sale, his biography & more on Artsy. Drawing inspiration from a diverse array of influences, from ...'

  'retna':
    title: 'Retna – 66 Artworks, Biography & Shows on Artsy'
    description: 'Explore the bio, art, and shows of street, graffiti, and studio artist Retna, a.k.a. Marquis Lewis. Browse works for sale (including prints) and more.'

  'robert-rauschenberg':
    title: 'Robert Rauschenberg - 418 Artworks, Bio & Shows on Artsy'

  'banksy':
    title: 'Banksy – 66 Artworks, Prints for sale, Bio & More on Artsy'
    description: 'Find the best of Banksy, including his biography, art for sale, current shows, and exclusive Banksy articles on Artsy. Banksy creates street art with an irreverent wit ...'

  'sol-lewitt':
    title: 'Sol Lewitt – 173 Works (Prints, Drawings & More) on Artsy'
    description: 'Browse the best of Sol Lewitt, including his artwork & prints for sale, upcoming shows, biography & exclusive Sol Lewitt articles on Artsy. One of the leading exponents of Conceptual art, Sol LeWitt...'

  'kiki-smith':
    title: 'Kiki Smith - 48 Artworks, Biography & Shows on Artsy'
    description: 'Find the best of Kiki Smith art, including sculptures & prints for sale. Explore her biography, current shows, and articles on Artsy. Kiki Smith’s collections are meditations on life and spirituality...'

  'david-lachapelle':
    title: 'David LaChapelle - 93 Artworks, Bio & Shows on Artsy'
    description: 'Find the best of David LaChapelle, including photographs, prints for sale, his biography, current shows, and articles on Artsy. Discovered by Andy Warhol at the age of 17...'
  