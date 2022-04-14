/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureApp_Test_QueryVariables = {};
export type FeatureApp_Test_QueryResponse = {
    readonly feature: {
        readonly " $fragmentRefs": FragmentRefs<"FeatureApp_feature">;
    } | null;
};
export type FeatureApp_Test_Query = {
    readonly response: FeatureApp_Test_QueryResponse;
    readonly variables: FeatureApp_Test_QueryVariables;
};



/*
query FeatureApp_Test_Query {
  feature(id: "example") {
    ...FeatureApp_feature
    id
  }
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Contact_artwork on Artwork {
  href
  is_inquireable: isInquireable
  sale {
    is_auction: isAuction
    is_live_open: isLiveOpen
    is_open: isOpen
    is_closed: isClosed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork: saleArtwork {
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  is_saved: isSaved
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    endAt
    cascadingEndTimeIntervalMinutes
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotLabel
    endAt
    formattedEndDateTime
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
  ...NewSaveButton_artwork
  ...HoverDetails_artwork
}

fragment FeatureApp_feature on Feature {
  ...FeatureMeta_feature
  ...FeatureHeader_feature
  description(format: HTML)
  callout(format: HTML)
  sets: setsConnection(first: 20) {
    edges {
      node {
        id
        ...FeatureSet_set
      }
    }
  }
}

fragment FeatureFeaturedLink_featuredLink on FeaturedLink {
  href
  title
  subtitle(format: PLAIN)
  description(format: HTML)
  image {
    small: cropped(width: 335, height: 240, version: ["main", "wide"]) {
      src
      srcSet
      width
      height
    }
    medium: cropped(width: 452, height: 324, version: ["main", "wide"]) {
      src
      srcSet
      width
      height
    }
    large: cropped(width: 904, height: 648, version: ["main", "wide"]) {
      src
      srcSet
      width
      height
    }
    full: resized(width: 1085, height: 777, version: ["main", "wide"]) {
      src
      srcSet
      width
      height
    }
  }
}

fragment FeatureHeaderDefault_feature on Feature {
  name
  subheadline(format: HTML)
  defaultImage: image {
    sm: cropped(width: 400, height: 400, version: ["main", "wide"]) {
      src
      srcSet
    }
    md: cropped(width: 600, height: 600, version: ["main", "wide"]) {
      src
      srcSet
    }
    lg: cropped(width: 1000, height: 1000, version: ["main", "wide"]) {
      src
      srcSet
    }
  }
}

fragment FeatureHeaderFull_feature on Feature {
  name
  subheadline(format: HTML)
  fullImage: image {
    sm: cropped(width: 800, height: 400, version: ["main", "wide"]) {
      src
      srcSet
    }
    md: cropped(width: 1200, height: 600, version: ["main", "wide"]) {
      src
      srcSet
    }
    lg: cropped(width: 2000, height: 1000, version: ["main", "wide"]) {
      src
      srcSet
    }
  }
}

fragment FeatureHeader_feature on Feature {
  ...FeatureHeaderDefault_feature
  ...FeatureHeaderFull_feature
  layout
}

fragment FeatureMeta_feature on Feature {
  slug
  meta {
    name
    description
    image
  }
}

fragment FeatureSetContainer_set on OrderedSet {
  id
  layout
  itemType
  orderedItems: orderedItemsConnection(first: 99) {
    edges {
      __typename
    }
  }
}

fragment FeatureSetItem_setItem on OrderedSetItem {
  __isOrderedSetItem: __typename
  __typename
  ... on FeaturedLink {
    id
  }
  ... on Artwork {
    id
  }
  ...GridItem_artwork
  ...FeatureFeaturedLink_featuredLink
}

fragment FeatureSetMeta_set on OrderedSet {
  name
  description(format: HTML)
}

fragment FeatureSet_set on OrderedSet {
  id
  layout
  name
  description(format: HTML)
  itemType
  orderedItems: orderedItemsConnection(first: 99) {
    edges {
      __typename
      node {
        __typename
        ... on Artwork {
          id
        }
        ... on FeaturedLink {
          id
        }
        ...FeatureSetItem_setItem
        ... on Node {
          __isNode: __typename
          id
        }
        ... on Profile {
          id
        }
      }
    }
  }
  ...FeatureSetMeta_set
  ...FeatureSetContainer_set
}

fragment GridItem_artwork on Artwork {
  internalID
  title
  image_title: imageTitle
  image {
    placeholder
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  artistNames
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}

fragment HoverDetails_artwork on Artwork {
  internalID
  attributionClass {
    name
    id
  }
  mediumType {
    filterGene {
      name
      id
    }
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment NewSaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v4 = {
  "kind": "Literal",
  "name": "height",
  "value": 400
},
v5 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide"
  ]
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "kind": "Literal",
  "name": "height",
  "value": 600
},
v10 = {
  "kind": "Literal",
  "name": "height",
  "value": 1000
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "layout",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": (v3/*: any*/),
  "kind": "ScalarField",
  "name": "description",
  "storageKey": "description(format:\"HTML\")"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v17 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v19 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v20 = [
  (v2/*: any*/),
  (v13/*: any*/)
],
v21 = [
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  }
],
v22 = [
  (v13/*: any*/)
],
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v28 = [
  "DEFAULT",
  "FULL"
],
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FeatureApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Feature",
        "kind": "LinkedField",
        "name": "feature",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeatureApp_feature"
          }
        ],
        "storageKey": "feature(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FeatureApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Feature",
        "kind": "LinkedField",
        "name": "feature",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FeatureMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "subheadline",
            "storageKey": "subheadline(format:\"HTML\")"
          },
          {
            "alias": "defaultImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "sm",
                "args": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 400
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "cropped(height:400,version:[\"main\",\"wide\"],width:400)"
              },
              {
                "alias": "md",
                "args": [
                  (v9/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 600
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "cropped(height:600,version:[\"main\",\"wide\"],width:600)"
              },
              {
                "alias": "lg",
                "args": [
                  (v10/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1000
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "cropped(height:1000,version:[\"main\",\"wide\"],width:1000)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "fullImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "sm",
                "args": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 800
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "cropped(height:400,version:[\"main\",\"wide\"],width:800)"
              },
              {
                "alias": "md",
                "args": [
                  (v9/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1200
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "cropped(height:600,version:[\"main\",\"wide\"],width:1200)"
              },
              {
                "alias": "lg",
                "args": [
                  (v10/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 2000
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "cropped(height:1000,version:[\"main\",\"wide\"],width:2000)"
              }
            ],
            "storageKey": null
          },
          (v11/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "callout",
            "storageKey": "callout(format:\"HTML\")"
          },
          {
            "alias": "sets",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
            "concreteType": "OrderedSetConnection",
            "kind": "LinkedField",
            "name": "setsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "OrderedSetEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrderedSet",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v13/*: any*/),
                      (v11/*: any*/),
                      (v2/*: any*/),
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "itemType",
                        "storageKey": null
                      },
                      {
                        "alias": "orderedItems",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 99
                          }
                        ],
                        "concreteType": "OrderedSetItemConnection",
                        "kind": "LinkedField",
                        "name": "orderedItemsConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "OrderedSetItemEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              (v14/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v14/*: any*/),
                                  {
                                    "kind": "TypeDiscriminator",
                                    "abstractKey": "__isOrderedSetItem"
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v13/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "internalID",
                                        "storageKey": null
                                      },
                                      (v15/*: any*/),
                                      {
                                        "alias": "image_title",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "imageTitle",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "placeholder",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "version",
                                                "value": "large"
                                              }
                                            ],
                                            "kind": "ScalarField",
                                            "name": "url",
                                            "storageKey": "url(version:\"large\")"
                                          },
                                          {
                                            "alias": "aspect_ratio",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "aspectRatio",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "artistNames",
                                        "storageKey": null
                                      },
                                      (v16/*: any*/),
                                      {
                                        "alias": "is_saved",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isSaved",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "date",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "sale_message",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "saleMessage",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "cultural_maker",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "culturalMaker",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v17/*: any*/),
                                        "concreteType": "Artist",
                                        "kind": "LinkedField",
                                        "name": "artists",
                                        "plural": true,
                                        "selections": [
                                          (v13/*: any*/),
                                          (v16/*: any*/),
                                          (v2/*: any*/)
                                        ],
                                        "storageKey": "artists(shallow:true)"
                                      },
                                      {
                                        "alias": "collecting_institution",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "collectingInstitution",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v17/*: any*/),
                                        "concreteType": "Partner",
                                        "kind": "LinkedField",
                                        "name": "partner",
                                        "plural": false,
                                        "selections": [
                                          (v2/*: any*/),
                                          (v16/*: any*/),
                                          (v13/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "type",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": "partner(shallow:true)"
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Sale",
                                        "kind": "LinkedField",
                                        "name": "sale",
                                        "plural": false,
                                        "selections": [
                                          (v18/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "cascadingEndTimeIntervalMinutes",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "startAt",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "is_auction",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isAuction",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "is_closed",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isClosed",
                                            "storageKey": null
                                          },
                                          (v13/*: any*/),
                                          {
                                            "alias": "is_live_open",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isLiveOpen",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "is_open",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isOpen",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "is_preview",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isPreview",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "display_timely_at",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "displayTimelyAt",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "sale_artwork",
                                        "args": null,
                                        "concreteType": "SaleArtwork",
                                        "kind": "LinkedField",
                                        "name": "saleArtwork",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "lotLabel",
                                            "storageKey": null
                                          },
                                          (v18/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "formattedEndDateTime",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "SaleArtworkCounts",
                                            "kind": "LinkedField",
                                            "name": "counts",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": "bidder_positions",
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "bidderPositions",
                                                "storageKey": null
                                              }
                                            ],
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "highest_bid",
                                            "args": null,
                                            "concreteType": "SaleArtworkHighestBid",
                                            "kind": "LinkedField",
                                            "name": "highestBid",
                                            "plural": false,
                                            "selections": (v19/*: any*/),
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "opening_bid",
                                            "args": null,
                                            "concreteType": "SaleArtworkOpeningBid",
                                            "kind": "LinkedField",
                                            "name": "openingBid",
                                            "plural": false,
                                            "selections": (v19/*: any*/),
                                            "storageKey": null
                                          },
                                          (v13/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v1/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "AttributionClass",
                                        "kind": "LinkedField",
                                        "name": "attributionClass",
                                        "plural": false,
                                        "selections": (v20/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "ArtworkMedium",
                                        "kind": "LinkedField",
                                        "name": "mediumType",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Gene",
                                            "kind": "LinkedField",
                                            "name": "filterGene",
                                            "plural": false,
                                            "selections": (v20/*: any*/),
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "is_inquireable",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isInquireable",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "is_biddable",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isBiddable",
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "Artwork",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v13/*: any*/),
                                      (v16/*: any*/),
                                      (v15/*: any*/),
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "format",
                                            "value": "PLAIN"
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "subtitle",
                                        "storageKey": "subtitle(format:\"PLAIN\")"
                                      },
                                      (v12/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": "small",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 240
                                              },
                                              (v5/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 335
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v21/*: any*/),
                                            "storageKey": "cropped(height:240,version:[\"main\",\"wide\"],width:335)"
                                          },
                                          {
                                            "alias": "medium",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 324
                                              },
                                              (v5/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 452
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v21/*: any*/),
                                            "storageKey": "cropped(height:324,version:[\"main\",\"wide\"],width:452)"
                                          },
                                          {
                                            "alias": "large",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 648
                                              },
                                              (v5/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 904
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v21/*: any*/),
                                            "storageKey": "cropped(height:648,version:[\"main\",\"wide\"],width:904)"
                                          },
                                          {
                                            "alias": "full",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 777
                                              },
                                              (v5/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 1085
                                              }
                                            ],
                                            "concreteType": "ResizedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "resized",
                                            "plural": false,
                                            "selections": (v21/*: any*/),
                                            "storageKey": "resized(height:777,version:[\"main\",\"wide\"],width:1085)"
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "FeaturedLink",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v22/*: any*/),
                                    "type": "Node",
                                    "abstractKey": "__isNode"
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v22/*: any*/),
                                    "type": "Profile",
                                    "abstractKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "orderedItemsConnection(first:99)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "setsConnection(first:20)"
          },
          (v13/*: any*/)
        ],
        "storageKey": "feature(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "df3ce6255221118b240608ae575e0c25",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "feature": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Feature"
        },
        "feature.callout": (v23/*: any*/),
        "feature.defaultImage": (v24/*: any*/),
        "feature.defaultImage.lg": (v25/*: any*/),
        "feature.defaultImage.lg.src": (v26/*: any*/),
        "feature.defaultImage.lg.srcSet": (v26/*: any*/),
        "feature.defaultImage.md": (v25/*: any*/),
        "feature.defaultImage.md.src": (v26/*: any*/),
        "feature.defaultImage.md.srcSet": (v26/*: any*/),
        "feature.defaultImage.sm": (v25/*: any*/),
        "feature.defaultImage.sm.src": (v26/*: any*/),
        "feature.defaultImage.sm.srcSet": (v26/*: any*/),
        "feature.description": (v23/*: any*/),
        "feature.fullImage": (v24/*: any*/),
        "feature.fullImage.lg": (v25/*: any*/),
        "feature.fullImage.lg.src": (v26/*: any*/),
        "feature.fullImage.lg.srcSet": (v26/*: any*/),
        "feature.fullImage.md": (v25/*: any*/),
        "feature.fullImage.md.src": (v26/*: any*/),
        "feature.fullImage.md.srcSet": (v26/*: any*/),
        "feature.fullImage.sm": (v25/*: any*/),
        "feature.fullImage.sm.src": (v26/*: any*/),
        "feature.fullImage.sm.srcSet": (v26/*: any*/),
        "feature.id": (v27/*: any*/),
        "feature.layout": {
          "enumValues": (v28/*: any*/),
          "nullable": false,
          "plural": false,
          "type": "FeatureLayouts"
        },
        "feature.meta": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "FeatureMeta"
        },
        "feature.meta.description": (v26/*: any*/),
        "feature.meta.image": (v23/*: any*/),
        "feature.meta.name": (v26/*: any*/),
        "feature.name": (v26/*: any*/),
        "feature.sets": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetConnection"
        },
        "feature.sets.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetEdge"
        },
        "feature.sets.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "feature.sets.edges.node.description": (v23/*: any*/),
        "feature.sets.edges.node.id": (v27/*: any*/),
        "feature.sets.edges.node.itemType": (v23/*: any*/),
        "feature.sets.edges.node.layout": {
          "enumValues": (v28/*: any*/),
          "nullable": false,
          "plural": false,
          "type": "OrderedSetLayouts"
        },
        "feature.sets.edges.node.name": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "OrderedSetItemConnection"
        },
        "feature.sets.edges.node.orderedItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItemEdge"
        },
        "feature.sets.edges.node.orderedItems.edges.__typename": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetItem"
        },
        "feature.sets.edges.node.orderedItems.edges.node.__isNode": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.__isOrderedSetItem": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.__typename": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artistNames": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "feature.sets.edges.node.orderedItems.edges.node.artists.href": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists.id": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.artists.name": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass.id": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.attributionClass.name": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.collecting_institution": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.cultural_maker": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.date": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.description": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.href": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.id": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image": (v24/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.aspect_ratio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "feature.sets.edges.node.orderedItems.edges.node.image.full": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "feature.sets.edges.node.orderedItems.edges.node.image.full.height": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.src": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.srcSet": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.full.width": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.height": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.src": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.srcSet": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.large.width": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.height": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.src": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.srcSet": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.medium.width": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.placeholder": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small": (v25/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.height": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.src": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.srcSet": (v26/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.small.width": (v30/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image.url": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.image_title": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.internalID": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.is_biddable": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.is_inquireable": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.is_saved": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene.id": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.mediumType.filterGene.name": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "feature.sets.edges.node.orderedItems.edges.node.partner.href": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner.id": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner.name": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.partner.type": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale.cascadingEndTimeIntervalMinutes": (v29/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.display_timely_at": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.endAt": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.id": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_auction": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_closed": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_live_open": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_open": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.is_preview": (v31/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale.startAt": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.endAt": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.formattedEndDateTime": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.highest_bid.display": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.id": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.lotLabel": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "feature.sets.edges.node.orderedItems.edges.node.sale_artwork.opening_bid.display": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.sale_message": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.slug": (v27/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.subtitle": (v23/*: any*/),
        "feature.sets.edges.node.orderedItems.edges.node.title": (v23/*: any*/),
        "feature.slug": (v27/*: any*/),
        "feature.subheadline": (v23/*: any*/)
      }
    },
    "name": "FeatureApp_Test_Query",
    "operationKind": "query",
    "text": "query FeatureApp_Test_Query {\n  feature(id: \"example\") {\n    ...FeatureApp_feature\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  is_saved: isSaved\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotLabel\n    endAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FeatureApp_feature on Feature {\n  ...FeatureMeta_feature\n  ...FeatureHeader_feature\n  description(format: HTML)\n  callout(format: HTML)\n  sets: setsConnection(first: 20) {\n    edges {\n      node {\n        id\n        ...FeatureSet_set\n      }\n    }\n  }\n}\n\nfragment FeatureFeaturedLink_featuredLink on FeaturedLink {\n  href\n  title\n  subtitle(format: PLAIN)\n  description(format: HTML)\n  image {\n    small: cropped(width: 335, height: 240, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    medium: cropped(width: 452, height: 324, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    large: cropped(width: 904, height: 648, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    full: resized(width: 1085, height: 777, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment FeatureHeaderDefault_feature on Feature {\n  name\n  subheadline(format: HTML)\n  defaultImage: image {\n    sm: cropped(width: 400, height: 400, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n    }\n    md: cropped(width: 600, height: 600, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n    }\n    lg: cropped(width: 1000, height: 1000, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FeatureHeaderFull_feature on Feature {\n  name\n  subheadline(format: HTML)\n  fullImage: image {\n    sm: cropped(width: 800, height: 400, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n    }\n    md: cropped(width: 1200, height: 600, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n    }\n    lg: cropped(width: 2000, height: 1000, version: [\"main\", \"wide\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FeatureHeader_feature on Feature {\n  ...FeatureHeaderDefault_feature\n  ...FeatureHeaderFull_feature\n  layout\n}\n\nfragment FeatureMeta_feature on Feature {\n  slug\n  meta {\n    name\n    description\n    image\n  }\n}\n\nfragment FeatureSetContainer_set on OrderedSet {\n  id\n  layout\n  itemType\n  orderedItems: orderedItemsConnection(first: 99) {\n    edges {\n      __typename\n    }\n  }\n}\n\nfragment FeatureSetItem_setItem on OrderedSetItem {\n  __isOrderedSetItem: __typename\n  __typename\n  ... on FeaturedLink {\n    id\n  }\n  ... on Artwork {\n    id\n  }\n  ...GridItem_artwork\n  ...FeatureFeaturedLink_featuredLink\n}\n\nfragment FeatureSetMeta_set on OrderedSet {\n  name\n  description(format: HTML)\n}\n\nfragment FeatureSet_set on OrderedSet {\n  id\n  layout\n  name\n  description(format: HTML)\n  itemType\n  orderedItems: orderedItemsConnection(first: 99) {\n    edges {\n      __typename\n      node {\n        __typename\n        ... on Artwork {\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n        ...FeatureSetItem_setItem\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on Profile {\n          id\n        }\n      }\n    }\n  }\n  ...FeatureSetMeta_set\n  ...FeatureSetContainer_set\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();
(node as any).hash = '8f25895d3707a914e267e965fb4d5a85';
export default node;
