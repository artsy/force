/**
 * @generated SignedSource<<b34c14cc8ca44435dfdce46fd28ff5a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightPills_Test_Query$variables = {};
export type ArtistInsightPills_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistInsightPills_artist">;
  } | null;
};
export type ArtistInsightPills_Test_Query = {
  variables: ArtistInsightPills_Test_Query$variables;
  response: ArtistInsightPills_Test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistInsightPills_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistInsightPills_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistInsightPills_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": "insightPills",
            "args": [
              {
                "kind": "Literal",
                "name": "kind",
                "value": [
                  "ACTIVE_SECONDARY_MARKET",
                  "HIGH_AUCTION_RECORD",
                  "ARTSY_VANGUARD_YEAR",
                  "CRITICALLY_ACCLAIMED"
                ]
              }
            ],
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "label",
                "storageKey": null
              }
            ],
            "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\",\"HIGH_AUCTION_RECORD\",\"ARTSY_VANGUARD_YEAR\",\"CRITICALLY_ACCLAIMED\"])"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "20e724c9cc18665b867616ff09f60ab9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artist.insightPills": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insightPills.kind": {
          "enumValues": [
            "ACTIVE_SECONDARY_MARKET",
            "ARTSY_VANGUARD_YEAR",
            "BIENNIAL",
            "COLLECTED",
            "CRITICALLY_ACCLAIMED",
            "GROUP_SHOW",
            "HIGH_AUCTION_RECORD",
            "REVIEWED",
            "SOLO_SHOW"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtistInsightKind"
        },
        "artist.insightPills.label": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "ArtistInsightPills_Test_Query",
    "operationKind": "query",
    "text": "query ArtistInsightPills_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistInsightPills_artist\n    id\n  }\n}\n\nfragment ArtistInsightPills_artist on Artist {\n  insightPills: insights(kind: [ACTIVE_SECONDARY_MARKET, HIGH_AUCTION_RECORD, ARTSY_VANGUARD_YEAR, CRITICALLY_ACCLAIMED]) {\n    kind\n    label\n  }\n}\n"
  }
};
})();

(node as any).hash = "c09eb27694988de076581701c1828dc7";

export default node;
