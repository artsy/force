/**
 * @generated SignedSource<<f8d4e6a2fbe0f543a78956bcd8504447>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowAppTestQuery$variables = Record<PropertyKey, never>;
export type ShowAppTestQuery$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowApp_show">;
  } | null | undefined;
};
export type ShowAppTestQuery = {
  response: ShowAppTestQuery$data;
  variables: ShowAppTestQuery$variables;
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
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v15 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowAppTestQuery",
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
    "name": "ShowAppTestQuery",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "GravityARImage",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "GravityImageURLs",
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
              (v8/*: any*/),
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
              (v9/*: any*/),
              (v10/*: any*/),
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
                      (v11/*: any*/),
                      (v12/*: any*/)
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
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "larger",
                      "large"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"larger\",\"large\"])"
              },
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "versions",
                "storageKey": null
              },
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
                  (v15/*: any*/),
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
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/)
                ],
                "storageKey": "resized(height:900,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:900)"
              }
            ],
            "storageKey": "images(default:false,size:100)"
          },
          (v9/*: any*/),
          (v10/*: any*/),
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
                      (v8/*: any*/)
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
                              (v8/*: any*/)
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
                "selections": [
                  (v1/*: any*/),
                  (v8/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasLocation",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
              (v8/*: any*/)
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
                  (v15/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "cacheID": "5ab5ab55f9ece9b51dfadb652b145f76",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.about": (v16/*: any*/),
        "show.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowCounts"
        },
        "show.counts.eligibleArtworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "show.endAt": (v16/*: any*/),
        "show.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "show.fair.endAt": (v16/*: any*/),
        "show.fair.exhibitionPeriod": (v16/*: any*/),
        "show.fair.hasFullFeature": (v17/*: any*/),
        "show.fair.href": (v16/*: any*/),
        "show.fair.id": (v18/*: any*/),
        "show.fair.image": (v19/*: any*/),
        "show.fair.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "show.fair.image.cropped.src": (v20/*: any*/),
        "show.fair.image.cropped.srcSet": (v20/*: any*/),
        "show.fair.internalID": (v18/*: any*/),
        "show.fair.isActive": (v17/*: any*/),
        "show.fair.name": (v16/*: any*/),
        "show.fair.slug": (v18/*: any*/),
        "show.fair.startAt": (v16/*: any*/),
        "show.formattedEndAt": (v16/*: any*/),
        "show.formattedStartAt": (v16/*: any*/),
        "show.hasLocation": (v17/*: any*/),
        "show.href": (v16/*: any*/),
        "show.id": (v18/*: any*/),
        "show.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "show.images.caption": (v16/*: any*/),
        "show.images.height": (v21/*: any*/),
        "show.images.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "show.images.src": (v16/*: any*/),
        "show.images.url": (v16/*: any*/),
        "show.images.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "show.images.width": (v21/*: any*/),
        "show.images.zoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "show.images.zoom.height": (v21/*: any*/),
        "show.images.zoom.src": (v20/*: any*/),
        "show.images.zoom.srcSet": (v20/*: any*/),
        "show.images.zoom.width": (v21/*: any*/),
        "show.internalID": (v18/*: any*/),
        "show.isFairBooth": (v17/*: any*/),
        "show.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "show.location.display": (v16/*: any*/),
        "show.location.id": (v18/*: any*/),
        "show.metaDescription": (v16/*: any*/),
        "show.metaImage": (v19/*: any*/),
        "show.metaImage.src": (v16/*: any*/),
        "show.name": (v16/*: any*/),
        "show.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "show.partner.__isNode": (v20/*: any*/),
        "show.partner.__typename": (v20/*: any*/),
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
        "show.partner.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "show.partner.artworksConnection.edges.node.id": (v18/*: any*/),
        "show.partner.artworksConnection.edges.node.image": (v19/*: any*/),
        "show.partner.artworksConnection.edges.node.image.url": (v16/*: any*/),
        "show.partner.href": (v16/*: any*/),
        "show.partner.id": (v18/*: any*/),
        "show.partner.internalID": (v18/*: any*/),
        "show.partner.isLinkable": (v17/*: any*/),
        "show.partner.locations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Location"
        },
        "show.partner.locations.city": (v16/*: any*/),
        "show.partner.locations.id": (v18/*: any*/),
        "show.partner.name": (v16/*: any*/),
        "show.partner.slug": (v18/*: any*/),
        "show.slug": (v18/*: any*/),
        "show.startAt": (v16/*: any*/),
        "show.status": (v16/*: any*/),
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
        "show.viewingRoomsConnection.edges.__typename": (v20/*: any*/),
        "show.viewingRoomsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "show.viewingRoomsConnection.edges.node.distanceToClose": (v16/*: any*/),
        "show.viewingRoomsConnection.edges.node.distanceToOpen": (v16/*: any*/),
        "show.viewingRoomsConnection.edges.node.href": (v16/*: any*/),
        "show.viewingRoomsConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GravityARImage"
        },
        "show.viewingRoomsConnection.edges.node.image.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GravityImageURLs"
        },
        "show.viewingRoomsConnection.edges.node.image.imageURLs.normalized": (v16/*: any*/),
        "show.viewingRoomsConnection.edges.node.internalID": (v18/*: any*/),
        "show.viewingRoomsConnection.edges.node.slug": (v20/*: any*/),
        "show.viewingRoomsConnection.edges.node.status": (v20/*: any*/),
        "show.viewingRoomsConnection.edges.node.title": (v20/*: any*/)
      }
    },
    "name": "ShowAppTestQuery",
    "operationKind": "query",
    "text": "query ShowAppTestQuery {\n  show(id: \"xxx\") {\n    ...ShowApp_show\n    id\n  }\n}\n\nfragment BackToFairBanner_show on Show {\n  fair {\n    name\n    href\n    id\n  }\n}\n\nfragment FairCard_fair on Fair {\n  name\n  image {\n    cropped(width: 768, height: 512, version: \"wide\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairTiming_fair on Fair {\n  exhibitionPeriod\n  startAt\n  endAt\n}\n\nfragment ShowAbout_show on Show {\n  about: description\n}\n\nfragment ShowApp_show on Show {\n  name\n  href\n  internalID\n  slug\n  about: description\n  isFairBooth\n  viewingRoomsConnection {\n    edges {\n      __typename\n    }\n  }\n  counts {\n    eligibleArtworks\n  }\n  fair {\n    hasFullFeature\n    id\n  }\n  images(default: false, size: 100) {\n    url\n  }\n  ...BackToFairBanner_show\n  ...ShowHeader_show\n  ...ShowAbout_show\n  ...ShowMeta_show\n  ...ShowInstallShots_show\n  ...ShowViewingRoom_show\n  ...ShowArtworksEmptyState_show\n  ...ShowContextCard_show\n}\n\nfragment ShowArtworksEmptyState_show on Show {\n  isFairBooth\n  status\n}\n\nfragment ShowContextCard_show on Show {\n  isFairBooth\n  partner {\n    __typename\n    ... on Partner {\n      internalID\n      slug\n      href\n      name\n      locations {\n        city\n        id\n      }\n      artworksConnection(first: 3, sort: MERCHANDISABILITY_DESC) {\n        edges {\n          node {\n            image {\n              url(version: \"larger\")\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  fair {\n    internalID\n    isActive\n    slug\n    href\n    name\n    ...FairTiming_fair\n    ...FairCard_fair\n    id\n  }\n}\n\nfragment ShowContextualLink_show on Show {\n  isFairBooth\n  hasLocation\n  location {\n    display\n    id\n  }\n  fair {\n    href\n    isActive\n    name\n    id\n  }\n  partner {\n    __typename\n    ... on Partner {\n      isLinkable\n      name\n      href\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n}\n\nfragment ShowHeader_show on Show {\n  name\n  startAt\n  endAt\n  status\n  formattedStartAt: startAt(format: \"MMMM D\")\n  formattedEndAt: endAt(format: \"MMMM D, YYYY\")\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...ShowContextualLink_show\n}\n\nfragment ShowInstallShots_show on Show {\n  name\n  images(default: false, size: 100) {\n    internalID\n    caption\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    versions\n    zoom: resized(quality: 85, width: 900, height: 900, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ShowMeta_show on Show {\n  name\n  href\n  metaDescription: description\n  metaImage {\n    src: url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n  }\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  formattedStartAt: startAt(format: \"MMMM D\")\n  formattedEndAt: endAt(format: \"MMMM D, YYYY\")\n}\n\nfragment ShowViewingRoom_show on Show {\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  viewingRoomsConnection {\n    edges {\n      node {\n        internalID\n        slug\n        status\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        title\n        href\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "82f2cdbcfe68e143275ade9e98d08d8e";

export default node;
