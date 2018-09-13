module.exports = (sd, { artwork, enableNewInquiryFlow }) ->
  sd.COMMERCIAL =
    enableNewInquiryFlow: enableNewInquiryFlow
    artwork:
      id: artwork.id
      _id: artwork._id
      price: artwork.price
      is_acquireable: artwork.is_acquireable
      is_inquireable: artwork.is_inquireable
      partner_id: artwork.partner._id
      partner_type: artwork.partner?.type
  if artwork.fair?
    sd.COMMERCIAL.artwork.fair =
      id: artwork.fair.id
      name: artwork.fair.name
      end_at: artwork.fair.end_at
