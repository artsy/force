/**
 * @generated SignedSource<<f2eb197462adc8e86ea9789a9a5982e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_Test_Query$variables = {};
export type PartnerApp_Test_Query$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerApp_partner">;
  } | null;
};
export type PartnerApp_Test_Query = {
  response: PartnerApp_Test_Query$data;
  variables: PartnerApp_Test_Query$variables;
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
v6 = {
  "kind": "Literal",
  "name": "displayOnPartnerProfile",
  "value": true
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "LocationConnection"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "LocationEdge"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Location"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistPartnerConnection"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerApp_Test_Query",
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
            "name": "PartnerApp_partner"
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
    "name": "PartnerApp_Test_Query",
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
            "name": "partnerType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayFullPartnerPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "partnerPageEligible",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isDefaultProfilePublic",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerCategory",
            "kind": "LinkedField",
            "name": "categories",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
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
                        "value": "wide"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"wide\")"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
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
                        "value": 80
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square140"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "src",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "srcSet",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "resized(height:80,version:\"square140\",width:80)"
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
                "name": "first",
                "value": 1
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
                        "name": "address2",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LatLng",
                        "kind": "LinkedField",
                        "name": "coordinates",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lat",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lng",
                            "storageKey": null
                          }
                        ],
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
                        "name": "phone",
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
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:1)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          {
            "alias": "locations",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
            "concreteType": "LocationConnection",
            "kind": "LinkedField",
            "name": "locationsConnection",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                      (v3/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:20)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayArtistsSection",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayWorksSection",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerCounts",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayableShows",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "articles",
            "args": null,
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": "representedArtists",
            "args": [
              (v6/*: any*/),
              {
                "kind": "Literal",
                "name": "representedBy",
                "value": true
              }
            ],
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,representedBy:true)"
          },
          {
            "alias": "notRepresentedArtists",
            "args": [
              (v6/*: any*/),
              {
                "kind": "Literal",
                "name": "hasPublishedArtworks",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "representedBy",
                "value": false
              }
            ],
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,hasPublishedArtworks:true,representedBy:false)"
          },
          {
            "alias": "viewingRooms",
            "args": [
              {
                "kind": "Literal",
                "name": "statuses",
                "value": [
                  "live",
                  "closed",
                  "scheduled"
                ]
              }
            ],
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": "viewingRoomsConnection(statuses:[\"live\",\"closed\",\"scheduled\"])"
          },
          (v1/*: any*/)
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "020c5f23aa7521e1003f6d194684c590",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.articles": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "partner.articles.totalCount": (v7/*: any*/),
        "partner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "partner.categories.id": (v8/*: any*/),
        "partner.categories.name": (v9/*: any*/),
        "partner.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerCounts"
        },
        "partner.counts.displayableShows": (v10/*: any*/),
        "partner.counts.eligibleArtworks": (v10/*: any*/),
        "partner.displayArtistsSection": (v11/*: any*/),
        "partner.displayFullPartnerPage": (v11/*: any*/),
        "partner.displayWorksSection": (v11/*: any*/),
        "partner.id": (v8/*: any*/),
        "partner.isDefaultProfilePublic": (v11/*: any*/),
        "partner.locations": (v12/*: any*/),
        "partner.locations.edges": (v13/*: any*/),
        "partner.locations.edges.node": (v14/*: any*/),
        "partner.locations.edges.node.city": (v9/*: any*/),
        "partner.locations.edges.node.id": (v8/*: any*/),
        "partner.locations.totalCount": (v7/*: any*/),
        "partner.locationsConnection": (v12/*: any*/),
        "partner.locationsConnection.edges": (v13/*: any*/),
        "partner.locationsConnection.edges.node": (v14/*: any*/),
        "partner.locationsConnection.edges.node.address": (v9/*: any*/),
        "partner.locationsConnection.edges.node.address2": (v9/*: any*/),
        "partner.locationsConnection.edges.node.city": (v9/*: any*/),
        "partner.locationsConnection.edges.node.coordinates": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LatLng"
        },
        "partner.locationsConnection.edges.node.coordinates.lat": (v15/*: any*/),
        "partner.locationsConnection.edges.node.coordinates.lng": (v15/*: any*/),
        "partner.locationsConnection.edges.node.country": (v9/*: any*/),
        "partner.locationsConnection.edges.node.id": (v8/*: any*/),
        "partner.locationsConnection.edges.node.phone": (v9/*: any*/),
        "partner.locationsConnection.edges.node.postalCode": (v9/*: any*/),
        "partner.locationsConnection.edges.node.state": (v9/*: any*/),
        "partner.meta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerMeta"
        },
        "partner.meta.description": (v9/*: any*/),
        "partner.meta.image": (v9/*: any*/),
        "partner.meta.title": (v9/*: any*/),
        "partner.name": (v9/*: any*/),
        "partner.notRepresentedArtists": (v16/*: any*/),
        "partner.notRepresentedArtists.totalCount": (v7/*: any*/),
        "partner.partnerPageEligible": (v11/*: any*/),
        "partner.partnerType": (v9/*: any*/),
        "partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "partner.profile.icon": (v17/*: any*/),
        "partner.profile.icon.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "partner.profile.icon.resized.src": (v18/*: any*/),
        "partner.profile.icon.resized.srcSet": (v18/*: any*/),
        "partner.profile.id": (v8/*: any*/),
        "partner.profile.image": (v17/*: any*/),
        "partner.profile.image.url": (v9/*: any*/),
        "partner.profile.internalID": (v8/*: any*/),
        "partner.representedArtists": (v16/*: any*/),
        "partner.representedArtists.totalCount": (v7/*: any*/),
        "partner.slug": (v8/*: any*/),
        "partner.type": (v9/*: any*/),
        "partner.viewingRooms": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomsConnection"
        },
        "partner.viewingRooms.totalCount": (v7/*: any*/)
      }
    },
    "name": "PartnerApp_Test_Query",
    "operationKind": "query",
    "text": "query PartnerApp_Test_Query {\n  partner(id: \"example\") {\n    ...PartnerApp_partner\n    id\n  }\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n  partnerType\n  displayArtistsSection\n  displayWorksSection\n  counts {\n    eligibleArtworks\n    displayableShows\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n  }\n  articles: articlesConnection {\n    totalCount\n  }\n  representedArtists: artistsConnection(representedBy: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  notRepresentedArtists: artistsConnection(representedBy: false, hasPublishedArtworks: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  viewingRooms: viewingRoomsConnection(statuses: [live, closed, scheduled]) {\n    totalCount\n  }\n}\n\nfragment PartnerApp_partner on Partner {\n  partnerType\n  displayFullPartnerPage\n  partnerPageEligible\n  isDefaultProfilePublic\n  categories {\n    id\n    name\n  }\n  profile {\n    ...PartnerHeaderImage_profile\n    id\n  }\n  ...PartnerMeta_partner\n  ...PartnerHeader_partner\n  ...NavigationTabs_partner\n}\n\nfragment PartnerHeaderImage_profile on Profile {\n  image {\n    url(version: \"wide\")\n  }\n}\n\nfragment PartnerHeader_partner on Partner {\n  name\n  type\n  slug\n  profile {\n    internalID\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment PartnerMeta_partner on Partner {\n  locationsConnection(first: 1) {\n    edges {\n      node {\n        address\n        address2\n        city\n        coordinates {\n          lat\n          lng\n        }\n        country\n        phone\n        postalCode\n        state\n        id\n      }\n    }\n  }\n  meta {\n    image\n    title\n    description\n  }\n  name\n  slug\n}\n"
  }
};
})();

(node as any).hash = "7805c99229b666a89e3663832d3976ee";

export default node;
