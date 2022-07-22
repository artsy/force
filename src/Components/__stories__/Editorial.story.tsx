import { Box, Text, GridColumns, Column, HTML } from "@artsy/palette"
import { Page } from "./Components/Page"

export default {
  title: "Molecules/Editorial",
  parameters: {
    layout: "fullscreen",
  },
}

export const TextCentered = () => {
  return (
    <Page title="<TextCentered />">
      <GridColumns>
        <Column span={6} start={4}>
          <HTML variant="sm">
            <p>
              Chicharrones marfa tumeric squid four loko flexitarian celiac hell
              of hot chicken jianbing salvia enamel pin woke. Migas you probably
              haven't heard of them church-key pok pok banh mi yr ennui ethical
              subway tile authentic. Sartorial retro roof party, gastropub
              bicycle rights drinking vinegar microdosing swag DIY deep v. Viral
              hella pop-up, banh mi squid poke chambray yuccie biodiesel occupy
              scenester.
            </p>

            <p>
              Etsy plaid raclette enamel pin poke everyday carry. Kickstarter
              messenger bag lomo tousled iPhone photo booth. Offal lumbersexual
              man braid chambray. Meh raw denim 90's, kitsch 8-bit af PBR&B
              street art plaid shabby chic.
            </p>

            <p>
              Sartorial kitsch gochujang fam health goth DIY tumblr irony
              meggings cray air plant you probably haven't heard of them.
              Mustache succulents affogato shaman pork belly chia. Gentrify vice
              chillwave flannel paleo bespoke taiyaki mixtape health goth.
              Ethical readymade gentrify ramps.
            </p>
          </HTML>

          <Text variant="xxl" my={4}>
            Portland cray PBR&B, gentrify brooklyn vaporware tbh.
          </Text>

          <HTML variant="sm">
            <p>
              Vape pork belly slow-carb, subway tile listicle franzen vegan
              church-key actually YOLO. Kogi fashion axe gluten-free air plant
              tofu. Cred unicorn jianbing pork belly lo-fi vaporware glossier
              pickled everyday carry XOXO la croix. Jean shorts unicorn
              stumptown viral franzen umami activated charcoal adaptogen seitan.
              Lyft authentic irony snackwave disrupt kogi, pabst subway tile
              ethical. You probably haven't heard of them cronut tbh, actually
              waistcoat yr yuccie.
            </p>

            <p>
              Tbh wayfarers pork belly, palo santo iPhone DIY craft beer
              church-key taxidermy cred glossier flannel squid jianbing.
              Live-edge tacos blog, photo booth meh tofu pok pok narwhal woke
              craft beer whatever vice. Man bun actually man braid blue bottle
              flannel, meh keffiyeh chillwave next level fashion axe distillery
              put a bird on it letterpress try-hard. Ennui shaman bitters air
              plant tilde.
            </p>
          </HTML>
        </Column>
      </GridColumns>
    </Page>
  )
}

// TODO: Do we need a proper sticky library?
export const TextFixedLeftScrollRight = () => {
  return (
    <Page title="<TextFixedLeftScrollRight />">
      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={720} />
        </Column>

        <Column span={6}>
          <HTML variant="sm">
            <p>
              Bicycle rights art party mumblecore intelligentsia cronut
              raclette. Bushwick kinfolk occupy cold-pressed. Kombucha drinking
              vinegar pabst hot chicken, tilde forage succulents bitters
              polaroid. Occupy fashion axe roof party, austin tousled godard
              pork belly viral PBR&B meditation try-hard tofu echo park. Marfa
              wolf jianbing put a bird on it. Green juice chia selvage narwhal.
            </p>

            <p>
              Chambray chicharrones bespoke, tbh drinking vinegar pitchfork
              affogato knausgaard pickled vaporware man bun. Kombucha quinoa af,
              taiyaki letterpress brooklyn next level literally yr before they
              sold out mlkshk la croix tattooed viral. Drinking vinegar echo
              park green juice PBR&B keytar locavore VHS vexillologist next
              level beard YOLO kogi messenger bag. Portland cray PBR&B, gentrify
              brooklyn vaporware tbh.
            </p>
          </HTML>

          <Text variant="xxl" my={4}>
            Artisan chillwave humblebrag messenger bag, meh brunch irony health
            goth succulents adaptogen offal quinoa austin coloring book.
          </Text>

          <HTML variant="sm">
            <p>
              Tumblr affogato gluten-free meh, shabby chic XOXO neutra
              chicharrones keffiyeh ethical vape schlitz wolf snackwave.
              Single-origin coffee gentrify vape, pabst seitan echo park
              coloring book. Shabby chic tilde raclette 90's cloud bread vegan.
              Affogato everyday carry XOXO kickstarter pabst lomo cloud bread
              semiotics whatever. Kickstarter irony hexagon, single-origin
              coffee kale chips brunch tofu jianbing flannel prism. Vice trust
              fund subway tile whatever air plant.
            </p>
            <p>
              Slow-carb ennui brooklyn venmo DIY plaid waistcoat. Tousled kogi
              shaman sartorial, tote bag tbh copper mug everyday carry art party
              asymmetrical ethical whatever meditation vinyl. Four dollar toast
              vinyl venmo knausgaard plaid cliche, farm-to-table meditation
              enamel pin. Street art four loko tumeric, flexitarian celiac
              chambray before they sold out squid food truck +1. Jean shorts
              semiotics distillery activated charcoal sustainable gluten-free
              pitchfork poutine locavore literally. Palo santo vape chartreuse,
              disrupt tumeric sartorial aesthetic health goth.
            </p>
            <p>
              Shoreditch kitsch unicorn, affogato 8-bit chartreuse next level
              truffaut gluten-free austin pop-up. Butcher plaid tacos chia
              tumblr waistcoat fixie hell of twee microdosing truffaut. Portland
              jean shorts microdosing, fanny pack hammock crucifix banjo
              raclette. Distillery sartorial art party health goth. Put a bird
              on it semiotics drinking vinegar, knausgaard man braid banh mi
              next level craft beer. Mlkshk art party succulents, pok pok
              actually listicle tousled. Tumblr fanny pack 3 wolf moon ramps
              lo-fi vape tilde iPhone umami mlkshk.
            </p>
          </HTML>
        </Column>
      </GridColumns>
    </Page>
  )
}

export const TextScrollLeftFixedRight = () => {
  return (
    <Page title="<TextScrollLeftFixedRight />">
      <GridColumns>
        <Column span={6}>
          <HTML variant="sm">
            <p>
              Tumblr affogato gluten-free meh, shabby chic XOXO neutra
              chicharrones keffiyeh ethical vape schlitz wolf snackwave.
              Single-origin coffee gentrify vape, pabst seitan echo park
              coloring book. Shabby chic tilde raclette 90's cloud bread vegan.
              Affogato everyday carry XOXO kickstarter pabst lomo cloud bread
              semiotics whatever. Kickstarter irony hexagon, single-origin
              coffee kale chips brunch tofu jianbing flannel prism. Vice trust
              fund subway tile whatever air plant.
            </p>

            <p>
              Slow-carb ennui brooklyn venmo DIY plaid waistcoat. Tousled kogi
              shaman sartorial, tote bag tbh copper mug everyday carry art party
              asymmetrical ethical whatever meditation vinyl. Four dollar toast
              vinyl venmo knausgaard plaid cliche, farm-to-table meditation
              enamel pin. Street art four loko tumeric, flexitarian celiac
              chambray before they sold out squid food truck +1. Jean shorts
              semiotics distillery activated charcoal sustainable gluten-free
              pitchfork poutine locavore literally. Palo santo vape chartreuse,
              disrupt tumeric sartorial aesthetic health goth.
            </p>

            <p>
              Shoreditch kitsch unicorn, affogato 8-bit chartreuse next level
              truffaut gluten-free austin pop-up. Butcher plaid tacos chia
              tumblr waistcoat fixie hell of twee microdosing truffaut. Portland
              jean shorts microdosing, fanny pack hammock crucifix banjo
              raclette. Distillery sartorial art party health goth. Put a bird
              on it semiotics drinking vinegar, knausgaard man braid banh mi
              next level craft beer. Mlkshk art party succulents, pok pok
              actually listicle tousled. Tumblr fanny pack 3 wolf moon ramps
              lo-fi vape tilde iPhone umami mlkshk.
            </p>
          </HTML>

          <Text variant="xxl" my={4}>
            Artisan chillwave humblebrag messenger bag, meh brunch irony health
            goth succulents adaptogen offal quinoa austin coloring book.
          </Text>

          <HTML variant="sm">
            <p>
              Bicycle rights art party mumblecore intelligentsia cronut
              raclette. Bushwick kinfolk occupy cold-pressed. Kombucha drinking
              vinegar pabst hot chicken, tilde forage succulents bitters
              polaroid. Occupy fashion axe roof party, austin tousled godard
              pork belly viral PBR&B meditation try-hard tofu echo park. Marfa
              wolf jianbing put a bird on it. Green juice chia selvage narwhal.
            </p>

            <p>
              Chambray chicharrones bespoke, tbh drinking vinegar pitchfork
              affogato knausgaard pickled vaporware man bun. Kombucha quinoa af,
              taiyaki letterpress brooklyn next level literally yr before they
              sold out mlkshk la croix tattooed viral. Drinking vinegar echo
              park green juice PBR&B keytar locavore VHS vexillologist next
              level beard YOLO kogi messenger bag. Portland cray PBR&B, gentrify
              brooklyn vaporware tbh.
            </p>
          </HTML>
        </Column>

        <Column span={6}>
          <Box bg="black30" height={720} />
        </Column>
      </GridColumns>
    </Page>
  )
}
