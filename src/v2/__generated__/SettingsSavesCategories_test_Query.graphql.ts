/* tslint:disable */
/* eslint-disable */

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
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
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
    "name": "after",
    "type": "String"
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v16 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v17 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v18 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v19 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
                                            "alias": "collecting_institution",
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
                                              (v8/*: any*/),
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v13/*: any*/),
        "me.followsAndSaves": {
          "type": "FollowsAndSaves",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection": {
          "type": "FollowGeneConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.totalCount": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges": {
          "type": "FollowGeneEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.followsAndSaves.categoriesConnection.edges.node": {
          "type": "FollowGene",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.internalID": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category": {
          "type": "Gene",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.id": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.cursor": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.pageInfo.endCursor": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.pageInfo.hasNextPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.internalID": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.id": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.__typename": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.name": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.href": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection": {
          "type": "FilterArtworksConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.slug": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.isFollowed": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges": {
          "type": "FilterArtworksEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.id": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped.src": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.avatar.cropped.srcSet": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.internalID": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.id": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image": (v18/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.imageTitle": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.title": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.href": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.is_saved": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.aspectRatio": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.height": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.slug": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.is_biddable": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.src": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.srcSet": (v16/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.width": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.image.resized.height": (v14/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.date": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_message": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.cultural_maker": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.collecting_institution": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.is_inquireable": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_preview": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.display_timely_at": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.id": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists.id": (v15/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists.href": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.artists.name": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.name": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.href": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.id": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_auction": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_closed": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.highest_bid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.opening_bid": {
          "type": "SaleArtworkOpeningBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.id": (v13/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_live_open": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale.is_open": (v19/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.partner.type": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v17/*: any*/),
        "me.followsAndSaves.categoriesConnection.edges.node.category.filterArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v17/*: any*/)
      }
    },
    "name": "SettingsSavesCategories_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesCategories_test_Query(\n  $after: String\n) {\n  me {\n    ...SettingsSavesCategories_me_WGPvJ\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment CategoryRail_category on Gene {\n  name\n  href\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  ...FollowGeneButton_gene\n  filterArtworksConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        ...ShelfArtwork_artwork\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FollowGeneButton_gene on Gene {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SettingsSavesCategories_me_WGPvJ on Me {\n  followsAndSaves {\n    categoriesConnection: genesConnection(first: 4, after: $after) {\n      totalCount\n      edges {\n        node {\n          internalID\n          category: gene {\n            internalID\n            ...CategoryRail_category\n            id\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  image {\n    resized(width: 200) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n"
  }
};
})();
(node as any).hash = '431d98efacf3ba4732d4d271fcb48674';
export default node;
