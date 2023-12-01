/**
 * @generated SignedSource<<0546374b03f913e6f8ad95d220990532>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ARTIST_SERIES" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
export type UserSearchCriteriaFrequency = "daily" | "instant" | "%future added value";
export type SavedSearchAlertEditForm_Test_Query$variables = {
  artistIDs?: ReadonlyArray<string> | null | undefined;
};
export type SavedSearchAlertEditForm_Test_Query$data = {
  readonly artistsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_artistsConnection">;
  } | null | undefined;
  readonly artworksConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_artworksConnection">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_me">;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_viewer">;
  } | null | undefined;
};
export type SavedSearchAlertEditForm_Test_Query$rawResponse = {
  readonly artistsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly internalID: string;
        readonly name: string | null | undefined;
        readonly slug: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly artworksConnection: {
    readonly aggregations: ReadonlyArray<{
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly name: string;
        readonly value: string;
      } | null | undefined> | null | undefined;
      readonly slice: ArtworkAggregation | null | undefined;
    } | null | undefined> | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly me: {
    readonly id: string;
    readonly savedSearch: {
      readonly acquireable: boolean | null | undefined;
      readonly additionalGeneIDs: ReadonlyArray<string>;
      readonly artistIDs: ReadonlyArray<string> | null | undefined;
      readonly artistSeriesIDs: ReadonlyArray<string>;
      readonly atAuction: boolean | null | undefined;
      readonly attributionClass: ReadonlyArray<string>;
      readonly colors: ReadonlyArray<string>;
      readonly dimensionRange: string | null | undefined;
      readonly height: string | null | undefined;
      readonly inquireableOnly: boolean | null | undefined;
      readonly internalID: string;
      readonly locationCities: ReadonlyArray<string>;
      readonly majorPeriods: ReadonlyArray<string>;
      readonly materialsTerms: ReadonlyArray<string>;
      readonly offerable: boolean | null | undefined;
      readonly partnerIDs: ReadonlyArray<string>;
      readonly priceRange: string | null | undefined;
      readonly sizes: ReadonlyArray<string>;
      readonly userAlertSettings: {
        readonly details: string | null | undefined;
        readonly email: boolean;
        readonly frequency: UserSearchCriteriaFrequency;
        readonly name: string | null | undefined;
        readonly push: boolean;
      };
      readonly width: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly viewer: {
    readonly notificationPreferences: ReadonlyArray<{
      readonly channel: string;
      readonly name: string;
      readonly status: SubGroupStatus;
    }>;
  } | null | undefined;
};
export type SavedSearchAlertEditForm_Test_Query = {
  rawResponse: SavedSearchAlertEditForm_Test_Query$rawResponse;
  response: SavedSearchAlertEditForm_Test_Query$data;
  variables: SavedSearchAlertEditForm_Test_Query$variables;
};

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
      "ARTIST_SERIES",
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
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_viewer"
          }
        ],
        "storageKey": null
      },
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
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NotificationPreference",
            "kind": "LinkedField",
            "name": "notificationPreferences",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "channel",
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
              (v4/*: any*/),
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
                "name": "artistSeriesIDs",
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
                  (v3/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "frequency",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "details",
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
                  (v4/*: any*/),
                  (v3/*: any*/),
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
                  (v3/*: any*/),
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
    "cacheID": "1bdfc1c7d5d4112fd1e25a43a4070def",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertEditForm_Test_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertEditForm_Test_Query(\n  $artistIDs: [String!]\n) {\n  viewer {\n    ...SavedSearchAlertEditForm_viewer\n  }\n  me {\n    ...SavedSearchAlertEditForm_me_1LtJCq\n    id\n  }\n  artistsConnection(slugs: $artistIDs) {\n    ...SavedSearchAlertEditForm_artistsConnection\n  }\n  artworksConnection(first: 0, artistIDs: $artistIDs, aggregations: [ARTIST_SERIES, LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]) {\n    ...SavedSearchAlertEditForm_artworksConnection\n    id\n  }\n}\n\nfragment SavedSearchAlertEditForm_artistsConnection on ArtistConnection {\n  edges {\n    node {\n      internalID\n      name\n      slug\n      id\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_artworksConnection on FilterArtworksConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n      value\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_me_1LtJCq on Me {\n  savedSearch(id: \"id\") {\n    internalID\n    acquireable\n    additionalGeneIDs\n    artistIDs\n    atAuction\n    attributionClass\n    artistSeriesIDs\n    colors\n    dimensionRange\n    sizes\n    width\n    height\n    inquireableOnly\n    locationCities\n    majorPeriods\n    materialsTerms\n    offerable\n    partnerIDs\n    priceRange\n    userAlertSettings {\n      name\n      email\n      push\n      frequency\n      details\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_viewer on Viewer {\n  notificationPreferences {\n    status\n    name\n    channel\n  }\n}\n"
  }
};
})();

(node as any).hash = "929f36360d72c82991ec0e9c83fcf455";

export default node;
