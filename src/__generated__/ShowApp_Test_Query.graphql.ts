/**
 * @generated SignedSource<<2c0c8dfa79710c1984963099d210e34d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowApp_Test_Query$variables = Record<PropertyKey, never>;
export type ShowApp_Test_Query$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowApp_show">;
  } | null | undefined;
};
export type ShowApp_Test_Query = {
  response: ShowApp_Test_Query$data;
  variables: ShowApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
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
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "short",
    "value": true
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v14 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v15 = [
  (v14/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "versions",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "blurhashDataURL",
  "storageKey": null
},
v20 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v21 = [
  (v12/*: any*/),
  (v13/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
],
v22 = [
  (v1/*: any*/),
  (v9/*: any*/)
],
v23 = [
  (v9/*: any*/)
],
v24 = {
  "kind": "InlineFragment",
  "selections": (v23/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v27 = [
  (v25/*: any*/),
  (v26/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v28 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v31 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v35 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v37 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v38 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksConnection"
},
v39 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v43 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v44 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v46 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowApp_show"
          }
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": "about",
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFairBooth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ViewingRoomsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ViewingRoom",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": (v7/*: any*/),
                        "kind": "ScalarField",
                        "name": "distanceToOpen",
                        "storageKey": "distanceToOpen(short:true)"
                      },
                      {
                        "alias": null,
                        "args": (v7/*: any*/),
                        "kind": "ScalarField",
                        "name": "distanceToClose",
                        "storageKey": "distanceToClose(short:true)"
                      },
                      (v8/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ARImage",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageURLs",
                            "kind": "LinkedField",
                            "name": "imageURLs",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "normalized",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ShowCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "eligibleArtworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fair",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasFullFeature",
                "storageKey": null
              },
              (v9/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isActive",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "exhibitionPeriod",
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
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
                        "name": "height",
                        "value": 512
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "wide"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 768
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": "cropped(height:512,version:\"wide\",width:768)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "sidebar",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
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
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:1)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "default",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 100
              }
            ],
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "caption",
                "storageKey": null
              },
              {
                "alias": "src",
                "args": (v15/*: any*/),
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"larger\",\"large\"])"
              },
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              {
                "alias": "zoom",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 900
                  },
                  {
                    "kind": "Literal",
                    "name": "quality",
                    "value": 85
                  },
                  (v20/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 900
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v21/*: any*/),
                "storageKey": "resized(height:900,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:900)"
              }
            ],
            "storageKey": "images(default:false,size:100)"
          },
          (v10/*: any*/),
          (v11/*: any*/),
          (v6/*: any*/),
          {
            "alias": "formattedStartAt",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMMM D"
              }
            ],
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": "startAt(format:\"MMMM D\")"
          },
          {
            "alias": "formattedEndAt",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMMM D, YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": "endAt(format:\"MMMM D, YYYY\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLinkable",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "locations",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      },
                      {
                        "kind": "Literal",
                        "name": "sort",
                        "value": "MERCHANDISABILITY_DESC"
                      }
                    ],
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
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
                                        "name": "version",
                                        "value": "larger"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:\"larger\")"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artworksConnection(first:3,sort:\"MERCHANDISABILITY_DESC\")"
                  }
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v22/*: any*/),
                "type": "ExternalPartner",
                "abstractKey": null
              },
              (v24/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "metaDescription",
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "metaImage",
            "plural": false,
            "selections": [
              {
                "alias": "src",
                "args": [
                  (v20/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "filtered_artworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "0,0"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": "total(format:\"0,0\")"
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
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v27/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v27/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v27/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/),
                      (v26/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "selections": (v23/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "includeAll",
                                "value": false
                              }
                            ],
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "aspectRatio",
                                "storageKey": null
                              },
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "placeholder",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": (v15/*: any*/),
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:[\"larger\",\"large\"])"
                              },
                              (v18/*: any*/),
                              (v19/*: any*/),
                              {
                                "alias": null,
                                "args": [
                                  (v14/*: any*/),
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 445
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": (v21/*: any*/),
                                "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
                              }
                            ],
                            "storageKey": "image(includeAll:false)"
                          },
                          (v8/*: any*/),
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
                            "name": "artistNames",
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
                            "args": (v28/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artist",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtistTargetSupply",
                                "kind": "LinkedField",
                                "name": "targetSupply",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isP1",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v9/*: any*/)
                            ],
                            "storageKey": "artist(shallow:true)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkPriceInsights",
                            "kind": "LinkedField",
                            "name": "marketPriceInsights",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "demandRank",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v28/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
                              (v2/*: any*/),
                              (v1/*: any*/)
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
                            "args": (v28/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              (v9/*: any*/)
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
                              (v11/*: any*/),
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
                                "name": "extendedBiddingIntervalMinutes",
                                "storageKey": null
                              },
                              (v10/*: any*/),
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
                              (v9/*: any*/),
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
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "extendedBiddingPeriodMinutes",
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
                              (v29/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v11/*: any*/),
                              (v30/*: any*/),
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
                                "selections": (v31/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v31/*: any*/),
                                "storageKey": null
                              },
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSaved",
                            "storageKey": null
                          },
                          {
                            "alias": "preview",
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
                                    "name": "version",
                                    "value": "square"
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:\"square\")"
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSavedToList",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v22/*: any*/),
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
                                "selections": (v22/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isUnlisted",
                            "storageKey": null
                          },
                          {
                            "alias": "is_biddable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBiddable",
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
                              (v11/*: any*/),
                              (v30/*: any*/),
                              (v29/*: any*/),
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "image_title",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "imageTitle",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v24/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArtworkConnectionInterface",
                "abstractKey": "__isArtworkConnectionInterface"
              }
            ],
            "storageKey": "filterArtworksConnection(first:30)"
          },
          (v9/*: any*/)
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "cacheID": "860861bf33d110bd56a78707c877c6b9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.about": (v32/*: any*/),
        "show.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowCounts"
        },
        "show.counts.eligibleArtworks": (v33/*: any*/),
        "show.endAt": (v32/*: any*/),
        "show.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "show.fair.endAt": (v32/*: any*/),
        "show.fair.exhibitionPeriod": (v32/*: any*/),
        "show.fair.hasFullFeature": (v34/*: any*/),
        "show.fair.href": (v32/*: any*/),
        "show.fair.id": (v35/*: any*/),
        "show.fair.image": (v36/*: any*/),
        "show.fair.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "show.fair.image.cropped.src": (v37/*: any*/),
        "show.fair.image.cropped.srcSet": (v37/*: any*/),
        "show.fair.internalID": (v35/*: any*/),
        "show.fair.isActive": (v34/*: any*/),
        "show.fair.name": (v32/*: any*/),
        "show.fair.slug": (v35/*: any*/),
        "show.fair.startAt": (v32/*: any*/),
        "show.filtered_artworks": (v38/*: any*/),
        "show.filtered_artworks.__isArtworkConnectionInterface": (v37/*: any*/),
        "show.filtered_artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "show.filtered_artworks.counts.total": (v33/*: any*/),
        "show.filtered_artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "show.filtered_artworks.edges.__isNode": (v37/*: any*/),
        "show.filtered_artworks.edges.__typename": (v37/*: any*/),
        "show.filtered_artworks.edges.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node": (v39/*: any*/),
        "show.filtered_artworks.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "show.filtered_artworks.edges.node.artist.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "show.filtered_artworks.edges.node.artist.targetSupply.isP1": (v34/*: any*/),
        "show.filtered_artworks.edges.node.artistNames": (v32/*: any*/),
        "show.filtered_artworks.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "show.filtered_artworks.edges.node.artists.href": (v32/*: any*/),
        "show.filtered_artworks.edges.node.artists.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.artists.name": (v32/*: any*/),
        "show.filtered_artworks.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "show.filtered_artworks.edges.node.attributionClass.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.attributionClass.name": (v32/*: any*/),
        "show.filtered_artworks.edges.node.collecting_institution": (v32/*: any*/),
        "show.filtered_artworks.edges.node.cultural_maker": (v32/*: any*/),
        "show.filtered_artworks.edges.node.date": (v32/*: any*/),
        "show.filtered_artworks.edges.node.href": (v32/*: any*/),
        "show.filtered_artworks.edges.node.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.image": (v36/*: any*/),
        "show.filtered_artworks.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "show.filtered_artworks.edges.node.image.blurhashDataURL": (v32/*: any*/),
        "show.filtered_artworks.edges.node.image.internalID": (v40/*: any*/),
        "show.filtered_artworks.edges.node.image.placeholder": (v32/*: any*/),
        "show.filtered_artworks.edges.node.image.resized": (v41/*: any*/),
        "show.filtered_artworks.edges.node.image.resized.height": (v42/*: any*/),
        "show.filtered_artworks.edges.node.image.resized.src": (v37/*: any*/),
        "show.filtered_artworks.edges.node.image.resized.srcSet": (v37/*: any*/),
        "show.filtered_artworks.edges.node.image.resized.width": (v42/*: any*/),
        "show.filtered_artworks.edges.node.image.url": (v32/*: any*/),
        "show.filtered_artworks.edges.node.image.versions": (v43/*: any*/),
        "show.filtered_artworks.edges.node.imageTitle": (v32/*: any*/),
        "show.filtered_artworks.edges.node.image_title": (v32/*: any*/),
        "show.filtered_artworks.edges.node.internalID": (v35/*: any*/),
        "show.filtered_artworks.edges.node.isSaved": (v34/*: any*/),
        "show.filtered_artworks.edges.node.isSavedToList": (v44/*: any*/),
        "show.filtered_artworks.edges.node.isUnlisted": (v44/*: any*/),
        "show.filtered_artworks.edges.node.is_biddable": (v34/*: any*/),
        "show.filtered_artworks.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "show.filtered_artworks.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "show.filtered_artworks.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "show.filtered_artworks.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "show.filtered_artworks.edges.node.mediumType.filterGene.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.mediumType.filterGene.name": (v32/*: any*/),
        "show.filtered_artworks.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "show.filtered_artworks.edges.node.partner.href": (v32/*: any*/),
        "show.filtered_artworks.edges.node.partner.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.partner.name": (v32/*: any*/),
        "show.filtered_artworks.edges.node.preview": (v36/*: any*/),
        "show.filtered_artworks.edges.node.preview.url": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "show.filtered_artworks.edges.node.sale.cascadingEndTimeIntervalMinutes": (v42/*: any*/),
        "show.filtered_artworks.edges.node.sale.display_timely_at": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale.endAt": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale.extendedBiddingIntervalMinutes": (v42/*: any*/),
        "show.filtered_artworks.edges.node.sale.extendedBiddingPeriodMinutes": (v42/*: any*/),
        "show.filtered_artworks.edges.node.sale.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.sale.is_auction": (v34/*: any*/),
        "show.filtered_artworks.edges.node.sale.is_closed": (v34/*: any*/),
        "show.filtered_artworks.edges.node.sale.is_preview": (v34/*: any*/),
        "show.filtered_artworks.edges.node.sale.startAt": (v32/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork": (v45/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.endAt": (v32/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.extendedBiddingEndAt": (v32/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.lotID": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork": (v45/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "show.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": (v33/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.endAt": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.extendedBiddingEndAt": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.formattedEndDateTime": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "show.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.id": (v35/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.lotID": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.lotLabel": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "show.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v32/*: any*/),
        "show.filtered_artworks.edges.node.sale_message": (v32/*: any*/),
        "show.filtered_artworks.edges.node.slug": (v35/*: any*/),
        "show.filtered_artworks.edges.node.title": (v32/*: any*/),
        "show.filtered_artworks.id": (v35/*: any*/),
        "show.filtered_artworks.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "show.filtered_artworks.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "show.filtered_artworks.pageCursors.around.cursor": (v37/*: any*/),
        "show.filtered_artworks.pageCursors.around.isCurrent": (v44/*: any*/),
        "show.filtered_artworks.pageCursors.around.page": (v46/*: any*/),
        "show.filtered_artworks.pageCursors.first": (v47/*: any*/),
        "show.filtered_artworks.pageCursors.first.cursor": (v37/*: any*/),
        "show.filtered_artworks.pageCursors.first.isCurrent": (v44/*: any*/),
        "show.filtered_artworks.pageCursors.first.page": (v46/*: any*/),
        "show.filtered_artworks.pageCursors.last": (v47/*: any*/),
        "show.filtered_artworks.pageCursors.last.cursor": (v37/*: any*/),
        "show.filtered_artworks.pageCursors.last.isCurrent": (v44/*: any*/),
        "show.filtered_artworks.pageCursors.last.page": (v46/*: any*/),
        "show.filtered_artworks.pageCursors.previous": (v47/*: any*/),
        "show.filtered_artworks.pageCursors.previous.cursor": (v37/*: any*/),
        "show.filtered_artworks.pageCursors.previous.page": (v46/*: any*/),
        "show.filtered_artworks.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "show.filtered_artworks.pageInfo.endCursor": (v32/*: any*/),
        "show.filtered_artworks.pageInfo.hasNextPage": (v44/*: any*/),
        "show.formattedEndAt": (v32/*: any*/),
        "show.formattedStartAt": (v32/*: any*/),
        "show.href": (v32/*: any*/),
        "show.id": (v35/*: any*/),
        "show.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "show.images.blurhashDataURL": (v32/*: any*/),
        "show.images.caption": (v32/*: any*/),
        "show.images.height": (v42/*: any*/),
        "show.images.internalID": (v40/*: any*/),
        "show.images.src": (v32/*: any*/),
        "show.images.url": (v32/*: any*/),
        "show.images.versions": (v43/*: any*/),
        "show.images.width": (v42/*: any*/),
        "show.images.zoom": (v41/*: any*/),
        "show.images.zoom.height": (v42/*: any*/),
        "show.images.zoom.src": (v37/*: any*/),
        "show.images.zoom.srcSet": (v37/*: any*/),
        "show.images.zoom.width": (v42/*: any*/),
        "show.internalID": (v35/*: any*/),
        "show.isFairBooth": (v34/*: any*/),
        "show.metaDescription": (v32/*: any*/),
        "show.metaImage": (v36/*: any*/),
        "show.metaImage.src": (v32/*: any*/),
        "show.name": (v32/*: any*/),
        "show.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "show.partner.__isNode": (v37/*: any*/),
        "show.partner.__typename": (v37/*: any*/),
        "show.partner.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "show.partner.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "show.partner.artworksConnection.edges.node": (v39/*: any*/),
        "show.partner.artworksConnection.edges.node.id": (v35/*: any*/),
        "show.partner.artworksConnection.edges.node.image": (v36/*: any*/),
        "show.partner.artworksConnection.edges.node.image.url": (v32/*: any*/),
        "show.partner.href": (v32/*: any*/),
        "show.partner.id": (v35/*: any*/),
        "show.partner.internalID": (v35/*: any*/),
        "show.partner.isLinkable": (v34/*: any*/),
        "show.partner.locations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Location"
        },
        "show.partner.locations.city": (v32/*: any*/),
        "show.partner.locations.id": (v35/*: any*/),
        "show.partner.name": (v32/*: any*/),
        "show.partner.slug": (v35/*: any*/),
        "show.sidebar": (v38/*: any*/),
        "show.sidebar.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworksAggregationResults"
        },
        "show.sidebar.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "show.sidebar.aggregations.counts.count": (v46/*: any*/),
        "show.sidebar.aggregations.counts.name": (v37/*: any*/),
        "show.sidebar.aggregations.counts.value": (v37/*: any*/),
        "show.sidebar.aggregations.slice": {
          "enumValues": [
            "ARTIST",
            "ARTIST_NATIONALITY",
            "ARTIST_SERIES",
            "ATTRIBUTION_CLASS",
            "COLOR",
            "DIMENSION_RANGE",
            "FOLLOWED_ARTISTS",
            "GALLERY",
            "INSTITUTION",
            "LOCATION_CITY",
            "MAJOR_PERIOD",
            "MATERIALS_TERMS",
            "MEDIUM",
            "MERCHANDISABLE_ARTISTS",
            "PARTNER",
            "PARTNER_CITY",
            "PERIOD",
            "PRICE_RANGE",
            "SIMPLE_PRICE_HISTOGRAM",
            "TOTAL"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtworkAggregation"
        },
        "show.sidebar.id": (v35/*: any*/),
        "show.slug": (v35/*: any*/),
        "show.startAt": (v32/*: any*/),
        "show.status": (v32/*: any*/),
        "show.viewingRoomsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomsConnection"
        },
        "show.viewingRoomsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ViewingRoomsEdge"
        },
        "show.viewingRoomsConnection.edges.__typename": (v37/*: any*/),
        "show.viewingRoomsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "show.viewingRoomsConnection.edges.node.distanceToClose": (v32/*: any*/),
        "show.viewingRoomsConnection.edges.node.distanceToOpen": (v32/*: any*/),
        "show.viewingRoomsConnection.edges.node.href": (v32/*: any*/),
        "show.viewingRoomsConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ARImage"
        },
        "show.viewingRoomsConnection.edges.node.image.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ImageURLs"
        },
        "show.viewingRoomsConnection.edges.node.image.imageURLs.normalized": (v32/*: any*/),
        "show.viewingRoomsConnection.edges.node.internalID": (v35/*: any*/),
        "show.viewingRoomsConnection.edges.node.slug": (v37/*: any*/),
        "show.viewingRoomsConnection.edges.node.status": (v37/*: any*/),
        "show.viewingRoomsConnection.edges.node.title": (v37/*: any*/)
      }
    },
    "name": "ShowApp_Test_Query",
    "operationKind": "query",
    "text": "query ShowApp_Test_Query {\n  show(id: \"xxx\") {\n    ...ShowApp_show\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks_3QDGWC\n}\n\nfragment ArtworkGrid_artworks_3QDGWC on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork_3QDGWC\n      ...FlatGridItem_artwork_3QDGWC\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment BackToFairBanner_show on Show {\n  fair {\n    name\n    href\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FairCard_fair on Fair {\n  name\n  image {\n    cropped(width: 768, height: 512, version: \"wide\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairTiming_fair on Fair {\n  exhibitionPeriod\n  startAt\n  endAt\n}\n\nfragment FlatGridItem_artwork_3QDGWC on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n  isSaved\n}\n\nfragment GridItem_artwork_3QDGWC on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment ShowAbout_show on Show {\n  about: description\n}\n\nfragment ShowApp_show on Show {\n  name\n  href\n  internalID\n  slug\n  about: description\n  isFairBooth\n  viewingRoomsConnection {\n    edges {\n      __typename\n    }\n  }\n  counts {\n    eligibleArtworks\n  }\n  fair {\n    hasFullFeature\n    id\n  }\n  sidebar: filterArtworksConnection(first: 1) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n  images(default: false, size: 100) {\n    url\n  }\n  ...BackToFairBanner_show\n  ...ShowHeader_show\n  ...ShowAbout_show\n  ...ShowMeta_show\n  ...ShowInstallShots_show\n  ...ShowViewingRoom_show\n  ...ShowArtworksEmptyState_show\n  ...ShowArtworks_show_4g78v5\n  ...ShowContextCard_show\n}\n\nfragment ShowArtworksEmptyState_show on Show {\n  isFairBooth\n  status\n}\n\nfragment ShowArtworks_show_4g78v5 on Show {\n  filtered_artworks: filterArtworksConnection(first: 30) {\n    id\n    counts {\n      total(format: \"0,0\")\n    }\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment ShowContextCard_show on Show {\n  isFairBooth\n  partner {\n    __typename\n    ... on Partner {\n      internalID\n      slug\n      href\n      name\n      locations {\n        city\n        id\n      }\n      artworksConnection(first: 3, sort: MERCHANDISABILITY_DESC) {\n        edges {\n          node {\n            image {\n              url(version: \"larger\")\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  fair {\n    internalID\n    isActive\n    slug\n    href\n    name\n    ...FairTiming_fair\n    ...FairCard_fair\n    id\n  }\n}\n\nfragment ShowContextualLink_show on Show {\n  isFairBooth\n  fair {\n    href\n    isActive\n    name\n    id\n  }\n  partner {\n    __typename\n    ... on Partner {\n      isLinkable\n      name\n      href\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n}\n\nfragment ShowHeader_show on Show {\n  name\n  startAt\n  endAt\n  status\n  formattedStartAt: startAt(format: \"MMMM D\")\n  formattedEndAt: endAt(format: \"MMMM D, YYYY\")\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...ShowContextualLink_show\n}\n\nfragment ShowInstallShots_show on Show {\n  name\n  images(default: false, size: 100) {\n    internalID\n    caption\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    versions\n    blurhashDataURL\n    zoom: resized(quality: 85, width: 900, height: 900, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ShowMeta_show on Show {\n  name\n  href\n  metaDescription: description\n  metaImage {\n    src: url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n  }\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  formattedStartAt: startAt(format: \"MMMM D\")\n  formattedEndAt: endAt(format: \"MMMM D, YYYY\")\n}\n\nfragment ShowViewingRoom_show on Show {\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  viewingRoomsConnection {\n    edges {\n      node {\n        internalID\n        slug\n        status\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        title\n        href\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f1164a3b4ce6ce68d7e8dd58937e6b2";

export default node;
