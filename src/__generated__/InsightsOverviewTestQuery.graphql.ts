/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InsightsOverviewTestQueryVariables = {};
export type InsightsOverviewTestQueryResponse = {
    readonly me: {
        readonly myCollectionInfo: {
            readonly " $fragmentRefs": FragmentRefs<"InsightsOverview_info">;
        } | null;
    } | null;
};
export type InsightsOverviewTestQuery = {
    readonly response: InsightsOverviewTestQueryResponse;
    readonly variables: InsightsOverviewTestQueryVariables;
};



/*
query InsightsOverviewTestQuery {
  me {
    myCollectionInfo {
      ...InsightsOverview_info
    }
    id
  }
}

fragment InsightsOverview_info on MyCollectionInfo {
  artworksCount
  artistsCount
}
*/

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
    "name": "InsightsOverviewTestQuery",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "InsightsOverview_info"
              }
            ],
            "storageKey": null
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
    "name": "InsightsOverviewTestQuery",
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
                "kind": "ScalarField",
                "name": "artworksCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistsCount",
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
    "cacheID": "ba8ce52ad6d67553f10078b5735a49a2",
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
        "me.myCollectionInfo.artistsCount": (v0/*: any*/),
        "me.myCollectionInfo.artworksCount": (v0/*: any*/)
      }
    },
    "name": "InsightsOverviewTestQuery",
    "operationKind": "query",
    "text": "query InsightsOverviewTestQuery {\n  me {\n    myCollectionInfo {\n      ...InsightsOverview_info\n    }\n    id\n  }\n}\n\nfragment InsightsOverview_info on MyCollectionInfo {\n  artworksCount\n  artistsCount\n}\n"
  }
};
})();
(node as any).hash = '1e7e8caff3661ed6ab28ab6063928645';
export default node;
