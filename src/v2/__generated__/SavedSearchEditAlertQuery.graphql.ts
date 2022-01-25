/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchEditAlertQueryVariables = {
    id: string;
    artistId: string;
};
export type SavedSearchEditAlertQueryResponse = {
    readonly me: {
        readonly savedSearch: {
            readonly " $fragmentRefs": FragmentRefs<"SavedSearchEditAlert_savedSearch">;
        } | null;
    } | null;
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchEditAlert_artist">;
    } | null;
    readonly artworksConnection: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchEditAlert_artworksConnection">;
    } | null;
};
export type SavedSearchEditAlertQuery = {
    readonly response: SavedSearchEditAlertQueryResponse;
    readonly variables: SavedSearchEditAlertQueryVariables;
};



/*
query SavedSearchEditAlertQuery(
  $id: ID!
  $artistId: String!
) {
  me {
    savedSearch(id: $id) {
      ...SavedSearchEditAlert_savedSearch
    }
    id
  }
  artist(id: $artistId) {
    ...SavedSearchEditAlert_artist
    id
  }
  artworksConnection(first: 0, artistID: $artistId, aggregations: [ARTIST, LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]) {
    ...SavedSearchEditAlert_artworksConnection
    id
  }
}

fragment SavedSearchEditAlert_artist on Artist {
  internalID
  name
  slug
}

fragment SavedSearchEditAlert_artworksConnection on FilterArtworksConnection {
  aggregations {
    slice
    counts {
      count
      name
      value
    }
  }
}

fragment SavedSearchEditAlert_savedSearch on SearchCriteria {
  internalID
  acquireable
  additionalGeneIDs
  artistID
  atAuction
  attributionClass
  colors
  dimensionRange
  sizes
  height
  inquireableOnly
  locationCities
  majorPeriods
  materialsTerms
  offerable
  partnerIDs
  priceRange
  userAlertSettings {
    name
    email
    push
  }
  width
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artistId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistId"
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "ARTIST",
      "LOCATION_CITY",
      "MATERIALS_TERMS",
      "MEDIUM",
      "PARTNER",
      "COLOR"
    ]
  },
  {
    "kind": "Variable",
    "name": "artistID",
    "variableName": "artistId"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 0
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchEditAlertQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "SearchCriteria",
            "kind": "LinkedField",
            "name": "savedSearch",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SavedSearchEditAlert_savedSearch"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchEditAlert_artist"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchEditAlert_artworksConnection"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SavedSearchEditAlertQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "SearchCriteria",
            "kind": "LinkedField",
            "name": "savedSearch",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "acquireable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "additionalGeneIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "atAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "attributionClass",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "colors",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dimensionRange",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sizes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "height",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "inquireableOnly",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "locationCities",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "majorPeriods",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "materialsTerms",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "offerable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priceRange",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SavedSearchUserAlertSettings",
                "kind": "LinkedField",
                "name": "userAlertSettings",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "push",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "width",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "count",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "35e93bba2871318f33cb4504a63a3e1d",
    "id": null,
    "metadata": {},
    "name": "SavedSearchEditAlertQuery",
    "operationKind": "query",
    "text": "query SavedSearchEditAlertQuery(\n  $id: ID!\n  $artistId: String!\n) {\n  me {\n    savedSearch(id: $id) {\n      ...SavedSearchEditAlert_savedSearch\n    }\n    id\n  }\n  artist(id: $artistId) {\n    ...SavedSearchEditAlert_artist\n    id\n  }\n  artworksConnection(first: 0, artistID: $artistId, aggregations: [ARTIST, LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]) {\n    ...SavedSearchEditAlert_artworksConnection\n    id\n  }\n}\n\nfragment SavedSearchEditAlert_artist on Artist {\n  internalID\n  name\n  slug\n}\n\nfragment SavedSearchEditAlert_artworksConnection on FilterArtworksConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n      value\n    }\n  }\n}\n\nfragment SavedSearchEditAlert_savedSearch on SearchCriteria {\n  internalID\n  acquireable\n  additionalGeneIDs\n  artistID\n  atAuction\n  attributionClass\n  colors\n  dimensionRange\n  sizes\n  height\n  inquireableOnly\n  locationCities\n  majorPeriods\n  materialsTerms\n  offerable\n  partnerIDs\n  priceRange\n  userAlertSettings {\n    name\n    email\n    push\n  }\n  width\n}\n"
  }
};
})();
(node as any).hash = '1ec08b8e1a7483916f08f05b545303ae';
export default node;
