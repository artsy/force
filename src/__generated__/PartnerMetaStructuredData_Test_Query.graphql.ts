/**
 * @generated SignedSource<<6dd841c22b68a12a6bfe91a09daacb53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerMetaStructuredData_Test_Query$variables = Record<PropertyKey, never>;
export type PartnerMetaStructuredData_Test_Query$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerMetaStructuredData_partner">;
  } | null | undefined;
};
export type PartnerMetaStructuredData_Test_Query = {
  response: PartnerMetaStructuredData_Test_Query$data;
  variables: PartnerMetaStructuredData_Test_Query$variables;
};

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
  "name": "href",
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  },
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v10 = {
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
    "name": "PartnerMetaStructuredData_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerMetaStructuredData_partner"
          }
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerMetaStructuredData_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bio",
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
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 1920
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1920
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "resized(height:1920,width:1920)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 250
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "untouched-png",
                          "large",
                          "square"
                        ]
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 250
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:250,version:[\"untouched-png\",\"large\",\"square\"],width:250)"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              }
            ],
            "concreteType": "LocationConnection",
            "kind": "LinkedField",
            "name": "locationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "address",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "country",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "postalCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "state",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "openingHours",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "FormattedDaySchedules",
                                "kind": "LinkedField",
                                "name": "schedules",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "days",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "hours",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "OpeningHoursArray",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "text",
                                "storageKey": null
                              }
                            ],
                            "type": "OpeningHoursText",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:50)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "representedBy",
                "value": true
              }
            ],
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "allArtistsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistPartnerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v1/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "allArtistsConnection(representedBy:true)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-decayed_merch"
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
                      (v1/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:30,sort:\"-decayed_merch\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "f315ac629c8b455e8029d68a3f066016",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.allArtistsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistPartnerConnection"
        },
        "partner.allArtistsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistPartnerEdge"
        },
        "partner.allArtistsConnection.edges.id": (v5/*: any*/),
        "partner.allArtistsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "partner.allArtistsConnection.edges.node.href": (v6/*: any*/),
        "partner.allArtistsConnection.edges.node.id": (v5/*: any*/),
        "partner.allArtistsConnection.edges.node.name": (v6/*: any*/),
        "partner.filterArtworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "partner.filterArtworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "partner.filterArtworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "partner.filterArtworksConnection.edges.node.href": (v6/*: any*/),
        "partner.filterArtworksConnection.edges.node.id": (v5/*: any*/),
        "partner.filterArtworksConnection.id": (v5/*: any*/),
        "partner.href": (v6/*: any*/),
        "partner.id": (v5/*: any*/),
        "partner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "partner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "partner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "partner.locationsConnection.edges.node.address": (v6/*: any*/),
        "partner.locationsConnection.edges.node.city": (v6/*: any*/),
        "partner.locationsConnection.edges.node.country": (v6/*: any*/),
        "partner.locationsConnection.edges.node.id": (v5/*: any*/),
        "partner.locationsConnection.edges.node.openingHours": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OpeningHoursUnion"
        },
        "partner.locationsConnection.edges.node.openingHours.__typename": (v7/*: any*/),
        "partner.locationsConnection.edges.node.openingHours.schedules": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FormattedDaySchedules"
        },
        "partner.locationsConnection.edges.node.openingHours.schedules.days": (v6/*: any*/),
        "partner.locationsConnection.edges.node.openingHours.schedules.hours": (v6/*: any*/),
        "partner.locationsConnection.edges.node.openingHours.text": (v6/*: any*/),
        "partner.locationsConnection.edges.node.postalCode": (v6/*: any*/),
        "partner.locationsConnection.edges.node.state": (v6/*: any*/),
        "partner.name": (v6/*: any*/),
        "partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "partner.profile.bio": (v6/*: any*/),
        "partner.profile.icon": (v8/*: any*/),
        "partner.profile.icon.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "partner.profile.icon.cropped.height": (v9/*: any*/),
        "partner.profile.icon.cropped.url": (v7/*: any*/),
        "partner.profile.icon.cropped.width": (v9/*: any*/),
        "partner.profile.id": (v5/*: any*/),
        "partner.profile.image": (v8/*: any*/),
        "partner.profile.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "partner.profile.image.resized.height": (v10/*: any*/),
        "partner.profile.image.resized.url": (v7/*: any*/),
        "partner.profile.image.resized.width": (v10/*: any*/),
        "partner.slug": (v5/*: any*/)
      }
    },
    "name": "PartnerMetaStructuredData_Test_Query",
    "operationKind": "query",
    "text": "query PartnerMetaStructuredData_Test_Query {\n  partner(id: \"example\") {\n    ...PartnerMetaStructuredData_partner\n    id\n  }\n}\n\nfragment PartnerMetaStructuredData_partner on Partner {\n  slug\n  href\n  name\n  profile {\n    bio\n    image {\n      resized(width: 1920, height: 1920) {\n        url\n        width\n        height\n      }\n    }\n    icon {\n      cropped(width: 250, height: 250, version: [\"untouched-png\", \"large\", \"square\"]) {\n        url\n        width\n        height\n      }\n    }\n    id\n  }\n  locationsConnection(first: 50) {\n    edges {\n      node {\n        address\n        city\n        country\n        postalCode\n        state\n        openingHours {\n          __typename\n          ... on OpeningHoursArray {\n            schedules {\n              days\n              hours\n            }\n          }\n          ... on OpeningHoursText {\n            text\n          }\n        }\n        id\n      }\n    }\n  }\n  allArtistsConnection(representedBy: true) {\n    edges {\n      node {\n        name\n        href\n        id\n      }\n      id\n    }\n  }\n  filterArtworksConnection(first: 30, sort: \"-decayed_merch\") {\n    edges {\n      node {\n        href\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ba5a0a7300182d4c78bb2dfdd1e51c8";

export default node;
