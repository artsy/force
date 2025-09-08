import { parsePressArticles } from "../AboutPressShelf"

describe("parsePressArticles", () => {
  it("should parse out articles correctly", () => {
    const articles = parsePressArticles({ markdown: MARKDOWN, limit: 3 })

    expect(articles).toEqual([
      {
        date: "May 2025",
        title:
          "What Collectors Really Want from Galleries, According to Artsy’s Casey Lesser",
        source: "Observer, Dan Duray",
        blurb: `“Artsy has been publishing data- and survey-driven reports focused on the art market for more than five years. In previous years, we released separate reports looking at galleries’ and collectors’ behaviors and trends. But over time, it became clear that the more meaningful opportunity was to bring those perspectives together, placing them in direct dialogue, as we have in this new Art Market Trends report.

“Given Artsy’s position at the intersection of gallery sales and online collecting, we’re uniquely positioned to surface what’s shaping the art market—what’s driving purchases, where the friction points are and how both parties are changing and adapting. This year’s report highlighted the key topics affecting both galleries and collectors and, importantly, offered a view into how the market is operating now.”`,
        url: "https://observer.com/2025/05/arts-interviews-artsy-chief-curator-casey-lesser/",
      },
      {
        date: "April 2025",
        title:
          "Artsy Survey Shows Art Market in Transition, With Dealers Unsure How to Meet New Collector Needs",
        source: "ARTnews, Daniel Cassady",
        blurb: `“In a new report published this week, Art Market Trends 2025, online art marketplace Artsy surveyed over 384 gallery professionals and art dealers across 60 countries. Over 75 percent of those surveyed cited economic uncertainty as a major challenge, while 60 percent said they are worried about changing collector behavior and declining demand.

“But, while galleries say they want to attract younger and first-time collectors, their tactics suggest a lack of execution or, perhaps, commitment. 43 percent said they plan to invest more in online sales this year, while just 19 percent describe themselves as leaders in adopting new technology. Over half, meanwhile, said they made no transparency improvements last year.”`,
        url: "https://www.artnews.com/art-news/market/galleries-new-buyers-poor-strategies-artsy-1234739856/",
      },
      {
        date: "April 2025",
        title:
          "69%: Collectors who believe the market lacks transparency, according to Artsy",
        source: "Rafael Pic, Le Quotidien de l'Art",
        blurb: `“Artsy today unveils the results of its art market survey, based on voluntary responses from 1,236 collectors and 384 art market professionals, a sample representing more than 60 different countries (even though 40% of the professionals and 57% of the collectors are based in the United States). The survey reveals that 59% of collectors purchased artworks online in 2024, and 76% of galleries offered works through this channel.

“One result is particularly surprising, especially in an era of supposedly free and abundant information: 69% of respondents feel that transparency (regarding prices, provenance, or a work’s past history) is seriously lacking, and that this hinders their purchasing decisions.”`,
        url: "https://www.lequotidiendelart.com/articles/27297-69.html",
      },
    ])
  })
})

const MARKDOWN = `## May 2025
### [What Collectors Really Want from Galleries, According to Artsy’s Casey Lesser](https://observer.com/2025/05/arts-interviews-artsy-chief-curator-casey-lesser/)
#### _Observer, Dan Duray_
“Artsy has been publishing data- and survey-driven reports focused on the art market for more than five years. In previous years, we released separate reports looking at galleries’ and collectors’ behaviors and trends. But over time, it became clear that the more meaningful opportunity was to bring those perspectives together, placing them in direct dialogue, as we have in this new Art Market Trends report.

“Given Artsy’s position at the intersection of gallery sales and online collecting, we’re uniquely positioned to surface what’s shaping the art market—what’s driving purchases, where the friction points are and how both parties are changing and adapting. This year’s report highlighted the key topics affecting both galleries and collectors and, importantly, offered a view into how the market is operating now.”

## April 2025
### [Artsy Survey Shows Art Market in Transition, With Dealers Unsure How to Meet New Collector Needs](https://www.artnews.com/art-news/market/galleries-new-buyers-poor-strategies-artsy-1234739856/)
#### _ARTnews, Daniel Cassady_
“In a new report published this week, [Art Market Trends 2025](https://www.artsy.net/article/artsy-editorial-art-market-trends-2025), online art marketplace Artsy surveyed over 384 gallery professionals and art dealers across 60 countries. Over 75 percent of those surveyed cited economic uncertainty as a major challenge, while 60 percent said they are worried about changing collector behavior and declining demand.

“But, while galleries say they want to attract younger and first-time collectors, their tactics suggest a lack of execution or, perhaps, commitment. 43 percent said they plan to invest more in online sales this year, while just 19 percent describe themselves as leaders in adopting new technology. Over half, meanwhile, said they made no transparency improvements last year.”

### [69%: Collectors who believe the market lacks transparency, according to Artsy](https://www.lequotidiendelart.com/articles/27297-69.html)
#### _Rafael Pic, Le Quotidien de l'Art_
“Artsy today unveils the results of its art market survey, based on voluntary responses from 1,236 collectors and 384 art market professionals, a sample representing more than 60 different countries (even though 40% of the professionals and 57% of the collectors are based in the United States). The survey reveals that 59% of collectors purchased artworks online in 2024, and 76% of galleries offered works through this channel.

“One result is particularly surprising, especially in an era of supposedly free and abundant information: 69% of respondents feel that transparency (regarding prices, provenance, or a work’s past history) is seriously lacking, and that this hinders their purchasing decisions.”

### [Artsy featured in Il Sole 24 Ore Milan design week coverage](https://files.artsy.net/documents/Il%20Sole%2024%20Ore%20-%20April%2012%20-%20Design%20-%20Casey.pdf)
#### _Il Sole 24 Ore Milan, Silvia Anna Barrilà_
“The principle of ‘Form Follows Function,’ according to which the shape of an object should be determined by its function, seems less and less like a diktat in contemporary design, where the boundaries with art are increasingly blurred.

“‘Today we see the success of pieces that blend art and design, like Daniel Arsham’s Dino Chair,’ explains Casey Lesser, chief curator at the platform Artsy, where Friedman Benda sells the New York artist and designer's chairs for $9,500. “Or the armchairs born from the collaboration between the Campana Brothers and Kaws, or even the clocks by Maarten Baas (recent works start at €50,000–70,000). Galleries like Carpenters Workshop Gallery in London or the American gallery The Future Perfect no longer make distinctions between the two fields.’”

## March 2025
### [“Artsy Unveils ‘Women on the Pulse,’ a Monthlong Tribute to Women in the Arts”](https://artplugged.co.uk/artsy-women-on-the-pulse-womens-history-month/)
#### _Art Plugged_
“To mark Women’s History Month, Artsy, the world’s largest online marketplace for discovering and buying art, has launched Women on the Pulse—a month-long campaign dedicated to spotlighting the women driving the art world forward today. The initiative celebrates artists, gallerists, collectors, and tastemakers who continue to shape and influence the cultural conversation.”

### [“Exploring the Photography Market with Artsy: An Interview with Casey Lesser”](https://www.all-about-photo.com/photo-articles/photo-article/1818/exploring-the-photography-market-with-artsy-an-interview-with-casey-lesser)
#### _Sandrine Hermand-Grisel, All About Photo_
“In this exclusive interview, Casey Lesser, Artsy's Chief Curator and Editor-in-Chief, shares insights into the current photography market, emerging trends, and how digital tools are shaping the way collectors engage with the medium. From the growing demand for portraiture to the impact of price transparency, Lesser offers a behind-the-scenes look at the evolving landscape of photography collecting.”

## February 2025
### Artsy x Art Relief LA Auction featured in Breakfast with ARTnews newsletter
#### _ARTnews_
“Artsy Partners with Art Relief LA for Benefit Auction: 40 works have been donated for the sale, which opened for bidding on February 20 and runs until March 6.”

### [Artsy x Art Relief LA: Benefit Auction 2025](https://fadmagazine.com/2025/02/25/artsy-x-art-relief-la-benefit-auction-2025/)
#### _Mark Westall, FAD Magazine_
“Artsy is running benefit auctions to raise much-needed funds for those affected by the recent wildfires in Los Angeles. Leading these initiatives is “Artsy x Art Relief LA: Benefit Auction 2025”, a benefit auction to raise crucial funds in support of Grief & Hope, and Centre for Disaster Philanthropy.”

### [Artsy Launches Series of Benefit Auctions to Aid Victims of Los Angeles Wildfires](https://artplugged.co.uk/artsy-benefit-auctions-aid-los-angeles-wildfire-victims/)
#### _Art Plugged_
“Artsy, the world’s largest online marketplace for discovering and acquiring art, has announced a series of significant benefit auctions aimed at raising much-needed funds for those affected by the recent wildfires in Los Angeles. Leading these philanthropic efforts is Artsy x Art Relief LA: Benefit Auction 2025, an initiative dedicated to supporting Grief and Hope, a relief organisation aiding those impacted by the disaster."

### Black-Owned Galleries Now featured in On Balance ARTnews newsletter
#### _ARTnews_
“Artsy is spotlighting Black-owned galleries and their artists for Black History Month, in an online campaign called ‘Black-Owned Galleries Now,’ launched Feb. 1. A variety of works are being shown, including piece by Satchel Lee, Cece Philips, David Driskell, and Zanele Muholi.”

## January 2025
### [Artsy Spotlights Black-Owned Galleries and Their Artists for Black History Month](https://artplugged.co.uk/artsy-black-owned-galleries-now-black-history-month/)
#### _Art Plugged_
“Artsy, the world’s largest online platform for discovering and collecting art, is delighted to announce the launch of its forthcoming campaign, Black-Owned Galleries Now. Launching during Black History Month, this dedicated initiative will celebrate and amplify the work of Black artists, selected and presented by more than 50 Black-owned galleries."

### [Artsy Launches "Black-Owned Galleries Now" to Celebrate Black History Month 2025](https://www.buyblack.org/articles/artsy-launches-black-owned-galleries-now-to-celebrate-black-history-month-2025)
#### _BuyBlack.org_
“Artsy, the world's largest online platform for discovering and collecting art, is excited to introduce its latest campaign, Black-Owned Galleries Now. This dedicated online showcase will highlight the work of Black artists, curated and presented by over 50 Black-owned galleries, in celebration of Black History Month."

## December 2024
### [With highest jump in demand, Indian artists draw global spotlight in 2024](https://timesofindia.indiatimes.com/india/with-highest-jump-in-demand-indian-artists-draw-global-spotlight-in-2024/articleshow/116549179.cms)
#### _Sharmila Ganesan, Times of India_
“Indian artists experienced the strongest surge in demand in 2024, according to a recent report on the global art market. late legend uch as M F Husian, the barefoot painter, and S H Raza, known for his signature ‘bindu’, led the charge, alongside a new wave of contemporary talents such as Raghave Babbar and Tanya Goel, states the survey released by Artsy, an online marketplace for buying and selling fine art."

### [+32 %: La croissance des artistes indiens sur Artsy](https://www.lequotidiendelart.com/articles/26674-32.html)
#### _Rafael Pic, Le Quotidien de l'Art_
“Launched in 2012, Artsy lists more than 1.6 million artworks for sale, representing more than 94,000 artists and more than 3,100 galleries from 100 different countries (with collectors spread even further across 190 countries). It's therefore a good observatory for detecting underlying movements in the market. Its 2024 report, unveiled this Monday, provides some interesting insights.” 

### [Artsy Shares Key Insights from Its Art Market Report: The Artsy Market Recap 2024](https://artplugged.co.uk/artsy-key-report-insights-artsy-market-recap-2024/)
#### _Art Plugged_
“Artsy, the world’s largest online marketplace for discovering and collecting art, is delighted to share its annual end-of-year report, The Artsy Market Recap 2024. Now in its third year, the report highlights key trends that shaped the art market in A must-read for those tracking the state of the art world and its future trajectory, The Artsy Market Recap 2024 report covers artists that have experienced surges in commercial interest from across geographies and segments, as well as big-picture findings that illustrate the state of the art market overall."

### [ArtCloud Gets All Artsy](https://fadmagazine.com/2024/12/02/artcloud-gets-all-artsy/)
#### _Mark Westall, FAD Magazine_
“Artsy has announced a new strategic partnership with ArtCloud together, the companies have developed Artsy’s most robust integration to date—allowing galleries to seamlessly and securely export inventory from ArtCloud to Artsy and receive Artsy sales data back in ArtCloud, saving up to 80% of the time it currently takes galleries to manage their online presence.”

## November 2024
### [CEO Jeffrey Yin featured live on CNN’s _First Move with Julia Chatterley_](https://files.artsy.net/videos/Jeffrey%20Yin%20Interview%20-%2021st%20November%20-%20First%20Move%20With%20Julia%20Chatterley-2024-11-21.mp4)
#### _Julia Chatterley, CNN_
Yin joined _First Move with Julia Chatterley_ on November 21st to discuss Artsy, the state of the art market, the marquee auction week in New York, and Sotheby’s sale of Maurizio Cattelan’s $6.2 million duct-taped banana.

### [Dustyn Kim featured on _Observer’s Business of Art Power List](https://observer.com/list/the-most-influential-people-in-art-2024/#dustyn-kim)
#### _The Observer_
“Dustyn Kim’s ascent to President of Artsy in 2024 marked the first time a woman has been at the helm of the online juggernaut, a platform that caters to both seasoned art collectors and the young, cash-strapped buyer hoping to grab a starter piece. In fact, taking the intimidation factor out of art collecting is something that moves Kim, who tells Observer that Artsy is on the verge of introducing new products and tools designed to ‘guide newer collectors through their journeys, from discovering and refining their tastes to making that first, second or third purchase.’”

### [The Artsy Edition Shop featured in the Financial Times](https://www.ft.com/content/a05bb485-858e-4552-a3ac-f35447ee9106)
#### _Melanie Gerlis, Financial Times_
“As the art market becomes more of a higher-volume, lower-value field, online platform Artsy has launched an [‘edition shop’](https://www.artsy.net/fair/the-artsy-edition-shop) bringing together work from some 16 well-known galleries and publishers, priced from $30 to $35,000.”

## October 2024
### [“More than 165 ‘Artists for Kamala’ auction their work in support of Harris”](https://www.npr.org/2024/10/01/nx-s1-5134860/kamala-harris-art-auction)
#### _Elizabeth Blair, NPR_
“The bidding has begun. Leading contemporary artists including Carrie Mae Weems, Judy Chicago, Jeff Koons and Shepard Fairey have donated works for an auction intended to raise money for Kamala Harris’ campaign for president. Many of the works that have been donated will remain open for bidding through Oct. 8 on the platform Artsy. Proceeds from the Artists for Kamala: Benefit Auction will go to the Harris Victory Fund.”

### [“Buy a Jeff Koons or an Amy Sherald, Support Democracy”](https://www.wmagazine.com/culture/artists-for-kamala-harris-artsy-art-auction-jeff-koons-amy-sherald)
#### _Carolyn Twersky, W Magazine_
“‘Art has always been a powerful way to express one’s vision and ideals and to mobilize people into action,’ Harris for President campaign manager Julie Chavez Rodriguez said. The Artsy portion of Artists for Kamala is expected to raise over one million dollars. Some of the highlights of the Artsy auction include a work by Bernhardt, titled Man in the Mirror, comprised of acrylic and spray paint on canvas and depicting the Pink Panther staring back at the viewer. Also up for sale is a classic Sherald portrait titled _As Soft as She Is..._ (shown above), a watercolor by Kara Walker, and a quintessential Marilyn Minter silkscreen.”

### [“Artists pitch in to raise $1mn for Kamala Harris” ](https://www.ft.com/content/1c9889d6-e123-483e-a192-cbf4e6e28a65)
#### _Melanie Gerlis, Financial Times_
“‘Bidding began this week on an online sale that could raise at least $1mn for Kamala Harris’s US presidential campaign. More than 160 artists including Jeff Koons, Jenny Holzer and Katherine Bernhardt have committed to donate to Artists for Kamala, with all proceeds to benefit the Harris Victory Fund. An initial sale of 54 works is currently on Artsy (until October 8), most via auction with 13 at fixed prices.”

### [“Works by Amy Sherald, Jeff Koons, and More Raise $1.5 Million for Kamala Harris” ](https://news.artnet.com/market/works-by-amy-sherald-jeff-koons-and-more-raise-1-5-million-for-kamala-harris-2553199)
#### _Jo Lawson-Tancred, Artnet News_
“Big name artists like Jeff Koons, Kara Walker, Amy Sherald, Jenny Holzer, and others donated a total of 54 works to the online benefit auction “Artists for Kamala,” which exceeded its pre-sale estimate of $1 million to raise over $1.5 million for the cause. Hosted by Artsy and organized by the Harris Victory Fund, the sale also featured many more high profile contemporary artists, including George Condo, Hank Willis Thomas, Betye Saar, Rashid Johnson, Robert Longo, Shephard Fairey, Julian Schnabel, and Joan Jonas.”

### [“Artists for Kamala Fundraiser Auction Brings in More Than $1.5 M.”](https://www.artnews.com/art-news/news/works-by-jenny-holzer-artists-for-kamala-fundraiser-auction-brings-in-more-than-1-5-m-1234718301/)
#### _Karen K. Ho, ARTnews_
“The Artists for Kamala fundraising online auction for Vice President Kamala Harris‘ presidential campaign has already yielded more than $1.5 million on an estimate of $1 million. Leading contemporary artists such as Kara Walker, Jenny Holzer, Amy Sherald, Simone Leigh, Jeff Koons, Ed Ruscha and others donated 54 works to the online benefit auction on October 8. The online auction on October 8 was hosted by Artsy and organized by the Harris Victory Fund, a joint fundraising committee that raises money for Harris for President, the Democratic National Committee, and state Democratic parties.”

### [“13 Highlights from ‘Artists for Kamala’ Benefit Sale, Including Works by Jeff Koons, George Condo, and More”](https://www.artnews.com/list/art-news/news/artists-for-kamala-benefit-sale-artsy-works-photos-1234719855/)
#### _Daniel Cassady, ARTnews_
“Works range in price from $250 for prints to as much $300,000 for household names like Jeff Koons and Amy Sherald. There were 164 works donated in total, around 50 of the which will be auctioned online through Artsy, starting on September 30 and closing on October 8. The remaining works come with fixed prices and are available on the Artists for Kamala website.”

### [“More than 100 artists donated works to fundraise for Kamala Harris”](https://www.theartnewspaper.com/2024/10/03/more-than-100-artist-donated-works-to-fundraise-for-kamala-harris)
#### _Benjamin Sutton, The Art Newspaper_
“Works donated by more than 100 artists—including Jeff Koons, Amy Sherald, Jenny Holzer, Hank Willis Thomas, Kara Walker and George Condo—are being sold to raise funds for the US presidential campaign of Vice President Kamala Harris and her running mate, Minnesota Governor Tim Walz. The sale, dubbed Artists for Kamala, has been organised by the Harris Victory Fund, with more than 100 works available for direct purchase while 41 pieces are being offered via an online auction on Artsy.”

### [“Artists for Kamala: Dozens of Artists Donated Works to Auction Benefitting Harris-Walz Presidential Campaign”](https://www.culturetype.com/2024/10/01/artists-for-kamala-dozens-of-artists-donated-works-to-auction-benefitting-harris-walz-presidential-campaign/)
#### _Victoria L. Valentine, Culture Type_
“An online benefit auction conducted by Artsy features 55 works. The auction opened Sept. 30 and is live through Oct. 8. The diverse slate of participating artists includes Njideka Akunyili Crosby, George Condo, Shepard Fairey, Sheila Hicks, Reggie Burrows Hodges, Jenny Holzer, Rashid Johnson, Jeff Koons, Christine Sun Kim, Betye Saar, Amy Sherald, Hank Willis Thomas, Khari Turner, and Yvonne Wells. At the time of publication, active bids ranged from $2,000 to $150,000.”

### [Artsy President Dustyn Kim featured in Billionaire Magazine feature “Women in Art”](https://www.bllnr.com/art-craftmanship/women-in-art)
#### _Victoria L. Valentine, Culture Type_
“Earlier this year, Dustyn Kim became the first female president at Artsy, the world’s largest online art marketplace, which launched a decade ago. Since she joined the company in 2017 coming from a tech background, Kim has helped to grow a client base of 4,000 galleries, fairs, auction houses and art institutions and 3.2 million users. 

“Kim’s mother was an artist and worked in the art world, which also significantly influenced her. ‘Her passion for creativity deeply influenced me from a young age and fostered a lifelong appreciation for the arts. I saw first-hand how challenging the traditional art world can be for artists. That personal connection played a significant role in leading me to Artsy,' she says.”
`
