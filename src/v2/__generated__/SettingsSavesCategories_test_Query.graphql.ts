/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesCategories_test_QueryVariables = {
    after?: string | null;
};
export type SettingsSavesCategories_test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsSavesCategories_me">;
    } | null;
};
export type SettingsSavesCategories_test_Query = {
    readonly response: SettingsSavesCategories_test_QueryResponse;
    readonly variables: SettingsSavesCategories_test_QueryVariables;
};



/*
query SettingsSavesCategories_test_Query(
  $after: String
) {
  me {
    ...SettingsSavesCategories_me_WGPvJ
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

fragment CategoryRail_category on Gene {
  name
  href
  avatar: image {
    cropped(width: 45, height: 45) {
      src
      srcSet
    }
  }
  ...FollowGeneButton_gene
  filterArtworksConnection(first: 10) {
    edges {
      node {
        internalID
        ...ShelfArtwork_artwork
        id
      }
    }
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
  saleMessage
  culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    isAuction
    isClosed
    id
  }
  saleArtwork {
    lotLabel
    counts {
      bidderPositions
    }
    highestBid {
      display
    }
    openingBid {
      display
    }
    id
  }
}

fragment FollowGeneButton_gene on Gene {
  id
  slug
  name
  internalID
  isFollowed
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SettingsSavesCategories_me_WGPvJ on Me {
  followsAndSaves {
    categoriesConnection: genesConnection(first: 4, after: $after) {
      totalCount
      edges {
        node {
          internalID
          category: gene {
            internalID
            ...CategoryRail_category
            id
          }
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}

fragment ShelfArtwork_artwork on Artwork {
  image {
    resized(width: 200) {
      src
      srcSet
      width
      height
    }
    aspectRatio
    height
  }
  imageTitle
  title
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v12 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsSavesCategories_test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "SettingsSavesCategories_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsSavesCategories_test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FollowsAndSaves",
            "kind": "LinkedField",
            "name": "followsAndSaves",
            "plural": false,
            "selections": [
              {
                "alias": "categoriesConnection",
                "args": (v2/*: any*/),
                "concreteType": "FollowGeneConnection",
                "kind": "LinkedField",
                "name": "genesConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FollowGeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowGene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": "category",
                            "args": null,
                            "concreteType": "Gene",
                            "kind": "LinkedField",
                            "name": "gene",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": "avatar",
                                "args": null,
                                "concreteType": "Image",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 45
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 45
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": [
                                      (v6/*: any*/),
                                      (v7/*: any*/)
                                    ],
                                    "storageKey": "cropped(height:45,width:45)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isFollowed",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "first",
                                    "value": 10
                                  }
                                ],
                                "concreteType": "FilterArtworksConnection",
                                "kind": "LinkedField",
                                "name": "filterArtworksConnection",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "FilterArtworksEdge",
                                    "kind": "LinkedField",
                                    "name": "edges",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Artwork",
                                        "kind": "LinkedField",
                                        "name": "node",
                                        "plural": false,
                                        "selections": [
                                          (v3/*: any*/),
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
                                                "args": [
                                                  {
                                                    "kind": "Literal",
                                                    "name": "width",
                                                    "value": 200
                                                  }
                                                ],
                                                "concreteType": "ResizedImageUrl",
                                                "kind": "LinkedField",
                                                "name": "resized",
                                                "plural": false,
                                                "selections": [
                                                  (v6/*: any*/),
                                                  (v7/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "width",
                                                    "storageKey": null
                                                  },
                                                  (v10/*: any*/)
                                                ],
                                                "storageKey": "resized(width:200)"
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "aspectRatio",
                                                "storageKey": null
                                              },
                                              (v10/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "imageTitle",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "title",
                                            "storageKey": null
                                          },
                                          (v5/*: any*/),
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
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "saleMessage",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "culturalMaker",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": (v11/*: any*/),
                                            "concreteType": "Artist",
                                            "kind": "LinkedField",
                                            "name": "artists",
                                            "plural": true,
                                            "selections": [
                                              (v8/*: any*/),
                                              (v5/*: any*/),
                                              (v4/*: any*/)
                                            ],
                                            "storageKey": "artists(shallow:true)"
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "collectingInstitution",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": (v11/*: any*/),
                                            "concreteType": "Partner",
                                            "kind": "LinkedField",
                                            "name": "partner",
                                            "plural": false,
                                            "selections": [
                                              (v4/*: any*/),
                                              (v5/*: any*/),
                                              (v8/*: any*/),
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
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "isAuction",
                                                "storageKey": null
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "isClosed",
                                                "storageKey": null
                                              },
                                              (v8/*: any*/),
                                              {
                                                "alias": "is_auction",
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "isAuction",
                                                "storageKey": null
                                              },
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
                                                "alias": "is_closed",
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "isClosed",
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
                                            "alias": null,
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
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "SaleArtworkCounts",
                                                "kind": "LinkedField",
                                                "name": "counts",
                                                "plural": false,
                                                "selections": [
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "bidderPositions",
                                                    "storageKey": null
                                                  }
                                                ],
                                                "storageKey": null
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "SaleArtworkHighestBid",
                                                "kind": "LinkedField",
                                                "name": "highestBid",
                                                "plural": false,
                                                "selections": (v12/*: any*/),
                                                "storageKey": null
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "SaleArtworkOpeningBid",
                                                "kind": "LinkedField",
                                                "name": "openingBid",
                                                "plural": false,
                                                "selections": (v12/*: any*/),
                                                "storageKey": null
                                              },
                                              (v8/*: any*/)
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
                                            "alias": "sale_artwork",
                                            "args": null,
                                            "concreteType": "SaleArtwork",
                                            "kind": "LinkedField",
                                            "name": "saleArtwork",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": "highest_bid",
                                                "args": null,
                                                "concreteType": "SaleArtworkHighestBid",
                                                "kind": "LinkedField",
                                                "name": "highestBid",
                                                "plural": false,
                                                "selections": (v12/*: any*/),
                                                "storageKey": null
                                              },
                                              {
                                                "alias": "opening_bid",
                                                "args": null,
                                                "concreteType": "SaleArtworkOpeningBid",
                                                "kind": "LinkedField",
                                                "name": "openingBid",
                                                "plural": false,
                                                "selections": (v12/*: any*/),
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
                                              (v8/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v8/*: any*/),
                                          (v9/*: any*/),
                                          {
                                            "alias": "is_biddable",
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isBiddable",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v8/*: any*/)
                                ],
                                "storageKey": "filterArtworksConnection(first:10)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "categoriesConnection",
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "SettingsSavesCategories_categoriesConnection",
                "kind": "LinkedHandle",
                "name": "genesConnection"
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "95d9bf5adf89a0537f43cda7980c760d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.followsAndSaves": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowsAndSaves"
        },
        "me.followsAndSaves.categoriesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowGeneConnection"
        },
        "me.followsAndSaves.categoriesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FollowGeneEdge"
        },
        "me.followsAndSaves.categoriesConnection.edges.cursor": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowGene"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.__typename": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped.src": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped.srcSet": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists.href": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists.name": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.collectingInstitution": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.culturalMaker": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.date": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.href": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.height": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.height": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.src": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.srcSet": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.width": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.imageTitle": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.internalID": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.is_biddable": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.is_inquireable": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.is_saved": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.href": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.name": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.type": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.display_timely_at": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.isAuction": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.isClosed": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_auction": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_closed": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_live_open": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_open": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_preview": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.counts": (v20/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.counts.bidderPositions": (v21/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.highestBid": (v22/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.highestBid.display": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.lotLabel": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.openingBid": (v23/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleArtwork.openingBid.display": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.saleMessage": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.counts": (v20/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v21/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.highest_bid": (v22/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.opening_bid": (v23/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.slug": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.title": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.href": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.internalID": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.isFollowed": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.name": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.slug": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.id": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.internalID": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.followsAndSaves.categoriesConnection.pageInfo.endCursor": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.followsAndSaves.categoriesConnection.totalCount": (v17/*: any*/),
        "me.id": (v16/*: any*/)
      }
    },
    "name": "SettingsSavesCategories_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesCategories_test_Query(\n  $after: String\n) {\n  me {\n    ...SettingsSavesCategories_me_WGPvJ\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment CategoryRail_category on Gene {\n  name\n  href\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  ...FollowGeneButton_gene\n  filterArtworksConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        ...ShelfArtwork_artwork\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  saleMessage\n  culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  saleArtwork {\n    lotLabel\n    counts {\n      bidderPositions\n    }\n    highestBid {\n      display\n    }\n    openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FollowGeneButton_gene on Gene {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SettingsSavesCategories_me_WGPvJ on Me {\n  followsAndSaves {\n    categoriesConnection: genesConnection(first: 4, after: $after) {\n      totalCount\n      edges {\n        node {\n          internalID\n          category: gene {\n            internalID\n            ...CategoryRail_category\n            id\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  image {\n    resized(width: 200) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n"
  }
};
})();
(node as any).hash = '431d98efacf3ba4732d4d271fcb48674';
export default node;
