/**
 * @generated SignedSource<<07f3dcab68dda23b4e358f076b2aa7f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightAchievements_Test_Query$variables = {};
export type ArtistInsightAchievements_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistInsightAchievements_artist">;
  } | null;
};
export type ArtistInsightAchievements_Test_Query = {
  variables: ArtistInsightAchievements_Test_Query$variables;
  response: ArtistInsightAchievements_Test_Query$data;
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistInsightAchievements_Test_Query",
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
            "name": "ArtistInsightAchievements_artist"
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
    "name": "ArtistInsightAchievements_Test_Query",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "insightAchievements",
            "args": [
              {
                "kind": "Literal",
                "name": "kind",
                "value": [
                  "SOLO_SHOW",
                  "GROUP_SHOW",
                  "COLLECTED",
                  "REVIEWED",
                  "BIENNIAL"
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
                "name": "label",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "entities",
                "storageKey": null
              }
            ],
            "storageKey": "insights(kind:[\"SOLO_SHOW\",\"GROUP_SHOW\",\"COLLECTED\",\"REVIEWED\",\"BIENNIAL\"])"
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
    "cacheID": "c04bdcf009ee74459be4ee7fe6f0094f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.id": (v1/*: any*/),
        "artist.insightAchievements": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insightAchievements.entities": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "artist.insightAchievements.label": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "artist.slug": (v1/*: any*/)
      }
    },
    "name": "ArtistInsightAchievements_Test_Query",
    "operationKind": "query",
    "text": "query ArtistInsightAchievements_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistInsightAchievements_artist\n    id\n  }\n}\n\nfragment ArtistInsightAchievements_artist on Artist {\n  slug\n  insightAchievements: insights(kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]) {\n    label\n    entities\n  }\n}\n"
  }
};
})();

(node as any).hash = "9972d4f3c5f79b6a5c2b5d5815bf6061";

export default node;
