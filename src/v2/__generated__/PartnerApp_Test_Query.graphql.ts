/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_Test_QueryVariables = {};
export type PartnerApp_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerApp_partner">;
    } | null;
};
export type PartnerApp_Test_Query = {
    readonly response: PartnerApp_Test_QueryResponse;
    readonly variables: PartnerApp_Test_QueryVariables;
};



/*
query PartnerApp_Test_Query {
  partner(id: "example") {
    ...PartnerApp_partner
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment NavigationTabs_partner on Partner {
  slug
  partnerType
  displayArtistsSection
  displayWorksSection
  counts {
    eligibleArtworks
    displayableShows
  }
  locations: locationsConnection(first: 20) {
    totalCount
  }
  articles: articlesConnection {
    totalCount
  }
  representedArtists: artistsConnection(representedBy: true, displayOnPartnerProfile: true) {
    totalCount
  }
  notRepresentedArtists: artistsConnection(representedBy: false, hasPublishedArtworks: true, displayOnPartnerProfile: true) {
    totalCount
  }
  viewingRooms: viewingRoomsConnection(statuses: [live, closed, scheduled]) {
    totalCount
  }
}

fragment PartnerApp_partner on Partner {
  partnerType
  displayFullPartnerPage
  partnerPageEligible
  isDefaultProfilePublic
  profile {
    ...PartnerHeaderImage_profile
    id
  }
  ...PartnerMeta_partner
  ...PartnerHeader_partner
  ...NavigationTabs_partner
}

fragment PartnerHeaderImage_profile on Profile {
  image {
    url(version: "wide")
  }
}

fragment PartnerHeader_partner on Partner {
  name
  type
  slug
  profile {
    icon {
      resized(width: 80, height: 80, version: "square140") {
        src
        srcSet
      }
    }
    ...FollowProfileButton_profile
    id
  }
  locations: locationsConnection(first: 20) {
    totalCount
    edges {
      node {
        city
        id
      }
    }
  }
}

fragment PartnerMeta_partner on Partner {
  locationsConnection(first: 1) {
    edges {
      node {
        address
        address2
        city
        coordinates {
          lat
          lng
        }
        country
        phone
        postalCode
        state
        id
      }
    }
  }
  meta {
    image
    title
    description
  }
  name
  slug
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "kind": "Literal",
  "name": "displayOnPartnerProfile",
  "value": true
},
v8 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v12 = {
  "type": "LocationConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "ArtistPartnerConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "LocationEdge",
  "enumValues": null,
  "plural": true,
  "nullable": true
},
v16 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v17 = {
  "type": "FormattedNumber",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v18 = {
  "type": "Location",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v19 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v20 = {
  "type": "Float",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
              },
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": "is_followed",
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
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
                      (v4/*: any*/),
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
          (v3/*: any*/),
          (v2/*: any*/),
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
              (v5/*: any*/),
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
                      (v4/*: any*/),
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
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": "representedArtists",
            "args": [
              (v7/*: any*/),
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
            "selections": (v6/*: any*/),
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,representedBy:true)"
          },
          {
            "alias": "notRepresentedArtists",
            "args": [
              (v7/*: any*/),
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
            "selections": (v6/*: any*/),
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
            "selections": (v6/*: any*/),
            "storageKey": "viewingRoomsConnection(statuses:[\"live\",\"closed\",\"scheduled\"])"
          },
          (v1/*: any*/)
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.id": (v8/*: any*/),
        "partner.partnerType": (v9/*: any*/),
        "partner.displayFullPartnerPage": (v10/*: any*/),
        "partner.partnerPageEligible": (v10/*: any*/),
        "partner.isDefaultProfilePublic": (v10/*: any*/),
        "partner.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.profile.id": (v11/*: any*/),
        "partner.locationsConnection": (v12/*: any*/),
        "partner.meta": {
          "type": "PartnerMeta",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.name": (v9/*: any*/),
        "partner.slug": (v11/*: any*/),
        "partner.type": (v9/*: any*/),
        "partner.locations": (v12/*: any*/),
        "partner.displayArtistsSection": (v10/*: any*/),
        "partner.displayWorksSection": (v10/*: any*/),
        "partner.counts": {
          "type": "PartnerCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.articles": {
          "type": "ArticleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.representedArtists": (v13/*: any*/),
        "partner.notRepresentedArtists": (v13/*: any*/),
        "partner.viewingRooms": {
          "type": "ViewingRoomsConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.profile.image": (v14/*: any*/),
        "partner.locationsConnection.edges": (v15/*: any*/),
        "partner.meta.image": (v9/*: any*/),
        "partner.meta.title": (v9/*: any*/),
        "partner.meta.description": (v9/*: any*/),
        "partner.profile.icon": (v14/*: any*/),
        "partner.locations.totalCount": (v16/*: any*/),
        "partner.locations.edges": (v15/*: any*/),
        "partner.counts.eligibleArtworks": (v17/*: any*/),
        "partner.counts.displayableShows": (v17/*: any*/),
        "partner.articles.totalCount": (v16/*: any*/),
        "partner.representedArtists.totalCount": (v16/*: any*/),
        "partner.notRepresentedArtists.totalCount": (v16/*: any*/),
        "partner.viewingRooms.totalCount": (v16/*: any*/),
        "partner.profile.image.url": (v9/*: any*/),
        "partner.locationsConnection.edges.node": (v18/*: any*/),
        "partner.profile.icon.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.profile.slug": (v11/*: any*/),
        "partner.profile.name": (v9/*: any*/),
        "partner.profile.internalID": (v11/*: any*/),
        "partner.profile.is_followed": (v10/*: any*/),
        "partner.locations.edges.node": (v18/*: any*/),
        "partner.locationsConnection.edges.node.address": (v9/*: any*/),
        "partner.locationsConnection.edges.node.address2": (v9/*: any*/),
        "partner.locationsConnection.edges.node.city": (v9/*: any*/),
        "partner.locationsConnection.edges.node.coordinates": {
          "type": "LatLng",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.locationsConnection.edges.node.country": (v9/*: any*/),
        "partner.locationsConnection.edges.node.phone": (v9/*: any*/),
        "partner.locationsConnection.edges.node.postalCode": (v9/*: any*/),
        "partner.locationsConnection.edges.node.state": (v9/*: any*/),
        "partner.locationsConnection.edges.node.id": (v8/*: any*/),
        "partner.profile.icon.resized.src": (v19/*: any*/),
        "partner.profile.icon.resized.srcSet": (v19/*: any*/),
        "partner.locations.edges.node.city": (v9/*: any*/),
        "partner.locations.edges.node.id": (v8/*: any*/),
        "partner.locationsConnection.edges.node.coordinates.lat": (v20/*: any*/),
        "partner.locationsConnection.edges.node.coordinates.lng": (v20/*: any*/)
      }
    },
    "name": "PartnerApp_Test_Query",
    "operationKind": "query",
    "text": "query PartnerApp_Test_Query {\n  partner(id: \"example\") {\n    ...PartnerApp_partner\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n  partnerType\n  displayArtistsSection\n  displayWorksSection\n  counts {\n    eligibleArtworks\n    displayableShows\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n  }\n  articles: articlesConnection {\n    totalCount\n  }\n  representedArtists: artistsConnection(representedBy: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  notRepresentedArtists: artistsConnection(representedBy: false, hasPublishedArtworks: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  viewingRooms: viewingRoomsConnection(statuses: [live, closed, scheduled]) {\n    totalCount\n  }\n}\n\nfragment PartnerApp_partner on Partner {\n  partnerType\n  displayFullPartnerPage\n  partnerPageEligible\n  isDefaultProfilePublic\n  profile {\n    ...PartnerHeaderImage_profile\n    id\n  }\n  ...PartnerMeta_partner\n  ...PartnerHeader_partner\n  ...NavigationTabs_partner\n}\n\nfragment PartnerHeaderImage_profile on Profile {\n  image {\n    url(version: \"wide\")\n  }\n}\n\nfragment PartnerHeader_partner on Partner {\n  name\n  type\n  slug\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    ...FollowProfileButton_profile\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment PartnerMeta_partner on Partner {\n  locationsConnection(first: 1) {\n    edges {\n      node {\n        address\n        address2\n        city\n        coordinates {\n          lat\n          lng\n        }\n        country\n        phone\n        postalCode\n        state\n        id\n      }\n    }\n  }\n  meta {\n    image\n    title\n    description\n  }\n  name\n  slug\n}\n"
  }
};
})();
(node as any).hash = '7805c99229b666a89e3663832d3976ee';
export default node;
