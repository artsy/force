/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
export type SavedSearchAlertEditForm_Test_QueryVariables = {
    artistIDs?: Array<string> | null | undefined;
};
export type SavedSearchAlertEditForm_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_me">;
    } | null;
    readonly artistsConnection: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_artistsConnection">;
    } | null;
    readonly artworksConnection: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_artworksConnection">;
    } | null;
};
export type SavedSearchAlertEditForm_Test_QueryRawResponse = {
    readonly me: ({
        readonly savedSearch: ({
            readonly internalID: string;
            readonly acquireable: boolean | null;
            readonly additionalGeneIDs: ReadonlyArray<string>;
            readonly artistIDs: ReadonlyArray<string> | null;
            readonly atAuction: boolean | null;
            readonly attributionClass: ReadonlyArray<string>;
            readonly colors: ReadonlyArray<string>;
            readonly dimensionRange: string | null;
            readonly sizes: ReadonlyArray<string>;
            readonly width: string | null;
            readonly height: string | null;
            readonly inquireableOnly: boolean | null;
            readonly locationCities: ReadonlyArray<string>;
            readonly majorPeriods: ReadonlyArray<string>;
            readonly materialsTerms: ReadonlyArray<string>;
            readonly offerable: boolean | null;
            readonly partnerIDs: ReadonlyArray<string>;
            readonly priceRange: string | null;
            readonly userAlertSettings: {
                readonly name: string | null;
                readonly email: boolean;
                readonly push: boolean;
            };
        }) | null;
        readonly id: string;
    }) | null;
    readonly artistsConnection: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly internalID: string;
                readonly name: string | null;
                readonly slug: string;
                readonly id: string;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly artworksConnection: ({
        readonly aggregations: ReadonlyArray<({
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<({
                readonly count: number;
                readonly name: string;
                readonly value: string;
            }) | null> | null;
        }) | null> | null;
        readonly id: string;
    }) | null;
};
export type SavedSearchAlertEditForm_Test_Query = {
    readonly response: SavedSearchAlertEditForm_Test_QueryResponse;
    readonly variables: SavedSearchAlertEditForm_Test_QueryVariables;
    readonly rawResponse: SavedSearchAlertEditForm_Test_QueryRawResponse;
};



/*
query SavedSearchAlertEditForm_Test_Query(
  $artistIDs: [String!]
) {
  me {
    ...SavedSearchAlertEditForm_me_1EL2c3
    id
  }
  artistsConnection(slugs: $artistIDs) {
    ...SavedSearchAlertEditForm_artistsConnection
  }
  artworksConnection(first: 0, artistIDs: $artistIDs, aggregations: [ARTIST, LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]) {
    ...SavedSearchAlertEditForm_artworksConnection
    id
  }
}

fragment SavedSearchAlertEditForm_artistsConnection on ArtistConnection {
  edges {
    node {
      internalID
      name
      slug
      id
    }
  }
}

fragment SavedSearchAlertEditForm_artworksConnection on FilterArtworksConnection {
  aggregations {
    slice
    counts {
      count
      name
      value
    }
  }
}

fragment SavedSearchAlertEditForm_me_1EL2c3 on Me {
  savedSearch(id: "id") {
    internalID
    acquireable
    additionalGeneIDs
    artistIDs
    atAuction
    attributionClass
    colors
    dimensionRange
    sizes
    width
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
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistIDs"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "artistIDs"
  }
],
v2 = [
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
    "name": "artistIDs",
    "variableName": "artistIDs"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 0
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertEditForm_Test_Query",
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
              {
                "kind": "Literal",
                "name": "savedSearchId",
                "value": "id"
              },
              {
                "kind": "Literal",
                "name": "withAggregations",
                "value": true
              }
            ],
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistConnection",
        "kind": "LinkedField",
        "name": "artistsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_artistsConnection"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_artworksConnection"
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
    "name": "SavedSearchAlertEditForm_Test_Query",
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
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "id"
              }
            ],
            "concreteType": "SearchCriteria",
            "kind": "LinkedField",
            "name": "savedSearch",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
                "name": "artistIDs",
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
                "name": "width",
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
                  (v4/*: any*/),
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
              }
            ],
            "storageKey": "savedSearch(id:\"id\")"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistConnection",
        "kind": "LinkedField",
        "name": "artistsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistEdge",
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v5/*: any*/)
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
        "args": (v2/*: any*/),
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
                  (v4/*: any*/),
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c148335a3392c74d927732267a17fcc8",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertEditForm_Test_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertEditForm_Test_Query(\n  $artistIDs: [String!]\n) {\n  me {\n    ...SavedSearchAlertEditForm_me_1EL2c3\n    id\n  }\n  artistsConnection(slugs: $artistIDs) {\n    ...SavedSearchAlertEditForm_artistsConnection\n  }\n  artworksConnection(first: 0, artistIDs: $artistIDs, aggregations: [ARTIST, LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]) {\n    ...SavedSearchAlertEditForm_artworksConnection\n    id\n  }\n}\n\nfragment SavedSearchAlertEditForm_artistsConnection on ArtistConnection {\n  edges {\n    node {\n      internalID\n      name\n      slug\n      id\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_artworksConnection on FilterArtworksConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n      value\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_me_1EL2c3 on Me {\n  savedSearch(id: \"id\") {\n    internalID\n    acquireable\n    additionalGeneIDs\n    artistIDs\n    atAuction\n    attributionClass\n    colors\n    dimensionRange\n    sizes\n    width\n    height\n    inquireableOnly\n    locationCities\n    majorPeriods\n    materialsTerms\n    offerable\n    partnerIDs\n    priceRange\n    userAlertSettings {\n      name\n      email\n      push\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5e317efb2e2f42279c0e942a11663dc5';
export default node;
