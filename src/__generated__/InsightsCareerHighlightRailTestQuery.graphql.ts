/**
 * @generated SignedSource<<ce273e8d012d5763167325ae11e737cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsCareerHighlightRailTestQuery$variables = Record<PropertyKey, never>;
export type InsightsCareerHighlightRailTestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"InsightsCareerHighlightRail_me">;
  } | null | undefined;
};
export type InsightsCareerHighlightRailTestQuery = {
  response: InsightsCareerHighlightRailTestQuery$data;
  variables: InsightsCareerHighlightRailTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InsightsCareerHighlightRailTestQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "InsightsCareerHighlightRail_me"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InsightsCareerHighlightRailTestQuery",
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
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistInsightsCount",
                "kind": "LinkedField",
                "name": "artistInsightsCount",
                "plural": false,
                "selections": [
                  {
                    "alias": "BIENNIAL",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "biennialCount",
                    "storageKey": null
                  },
                  {
                    "alias": "COLLECTED",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "collectedCount",
                    "storageKey": null
                  },
                  {
                    "alias": "GROUP_SHOW",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "groupShowCount",
                    "storageKey": null
                  },
                  {
                    "alias": "SOLO_SHOW",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "soloShowCount",
                    "storageKey": null
                  },
                  {
                    "alias": "REVIEWED",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reviewedCount",
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "47717270de5d70201125df6d335eb907",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "me.myCollectionInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyCollectionInfo"
        },
        "me.myCollectionInfo.artistInsightsCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistInsightsCount"
        },
        "me.myCollectionInfo.artistInsightsCount.BIENNIAL": (v0/*: any*/),
        "me.myCollectionInfo.artistInsightsCount.COLLECTED": (v0/*: any*/),
        "me.myCollectionInfo.artistInsightsCount.GROUP_SHOW": (v0/*: any*/),
        "me.myCollectionInfo.artistInsightsCount.REVIEWED": (v0/*: any*/),
        "me.myCollectionInfo.artistInsightsCount.SOLO_SHOW": (v0/*: any*/)
      }
    },
    "name": "InsightsCareerHighlightRailTestQuery",
    "operationKind": "query",
    "text": "query InsightsCareerHighlightRailTestQuery {\n  me {\n    ...InsightsCareerHighlightRail_me\n    id\n  }\n}\n\nfragment InsightsCareerHighlightRail_me on Me {\n  myCollectionInfo {\n    artistInsightsCount {\n      BIENNIAL: biennialCount\n      COLLECTED: collectedCount\n      GROUP_SHOW: groupShowCount\n      SOLO_SHOW: soloShowCount\n      REVIEWED: reviewedCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "00fe6979442f1b1f433e4f52ee82865e";

export default node;
