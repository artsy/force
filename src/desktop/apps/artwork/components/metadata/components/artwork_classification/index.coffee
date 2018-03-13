modalize = require '../../../../../../components/modalize/index.coffee'

module.exports = ->
  attributionClassDetailsHtml = """
    <div class='attribution-class-container'>
      <div class='attribution-class-header'>
        <h1>Artwork classifications</h1>
        <h2>These definitions will be displayed with the artwork to ensure collector confidence on our platform.</h2>
      </div>
      <div class='attribution-class-list'>
        <div class='attribution-class-row'>
          <div class='attribution-class-name'>Unique</div>
          <div class='attribution-class-description'>
            One of a kind piece, created by the artist.
          </div>
        </div>
        <div class='attribution-class-row'>
          <div class='attribution-class-name'>Limited edition</div>
          <div class='attribution-class-description'>
            Original works created in multiple with direct involvement of the artist.
            Generally, editions are smaller than 150 pieces total.
          </div>
        </div>
        <div class='attribution-class-row'>
          <div class='attribution-class-name'>Made-to-order</div>
          <div class='attribution-class-description'>
            A piece that is made-to-order, taking into account the collector’s preferences.
          </div>
        </div>
        <div class='attribution-class-row'>
          <div class='attribution-class-name'>Reproduction</div>
          <div class='attribution-class-description'>
            Reproduction of an original work authorized by artist’s studio or estate.
            The artist was not directly involved in production.
          </div>
        </div>
        <div class='attribution-class-row'>
          <div class='attribution-class-name'>Editioned multiple</div>
          <div class='attribution-class-description'>
            Pieces created in larger limited editions, authorized by the artist’s studio or estate.
            Not produced with direct involvement of the artist.
          </div>
        </div>
        <div class='attribution-class-row'>
          <div class='attribution-class-name'>Non-editioned multiple</div>
          <div class='attribution-class-description'>
            Works made in unlimited or unknown numbers of copies, authorized by the artist’s studio or estate.
            Not produced with direct involvement of the artist.
          </div>
        </div>
        <div class='attribution-class-row'>
          <div class='attribution-class-name'>Ephemera</div>
          <div class='attribution-class-description'>
            Peripheral artifacts related to the artist.
            Exhibition materials, memorabilia, photos of the artist, autographs, etc.
          </div>
        </div>
      </div>
    </div>
  """
  $el = $(attributionClassDetailsHtml)

  view = render: -> $el: $el

  modal = modalize view,
    className: 'modalize artwork-classification-modal'
    dimensions: width: '600px'
  modal.open()
  modal
