module.exports = JSON.stringify
  _links:
    self:
      href: "ROOT/"

    docs:
      href: "ROOT/docs"

    status:
      href: "ROOT/status"

    current_user:
      href: "ROOT/current_user"

    artists:
      href: "ROOT/artists"

    artist:
      href: "ROOT/artists/{id}"
      templated: true

    users:
      href: "ROOT/users"

    user:
      href: "ROOT/users/{id}"
      templated: true

    profiles:
      href: "ROOT/profiles"

    profile:
      href: "ROOT/profiles/{id}"
      templated: true

    applications:
      href: "ROOT/applications"

    application:
      href: "ROOT/applications/{id}"
      templated: true

    genes:
      href: "ROOT/genes{?artist_id,artwork_id}"
      templated: true

    gene:
      href: "ROOT/genes/{id}"
      templated: true

    partners:
      href: "ROOT/partners"

    partner:
      href: "ROOT/partners/{id}"
      templated: true

    artworks:
      href: "ROOT/artworks{?artist_id}"
      templated: true

    artwork:
      href: "ROOT/artworks/{id}"
      templated: true

    edition:
      href: "ROOT/editions/{id}{?artwork_id}"
      templated: true