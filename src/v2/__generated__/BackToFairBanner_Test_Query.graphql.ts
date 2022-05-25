/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackToFairBanner_Test_QueryVariables = {};
export type BackToFairBanner_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"BackToFairBanner_show">;
    } | null;
};
export type BackToFairBanner_Test_Query = {
    readonly response: BackToFairBanner_Test_QueryResponse;
    readonly variables: BackToFairBanner_Test_QueryVariables;
};



/*
query BackToFairBanner_Test_Query {
  show(id: "show-id") {
    ...BackToFairBanner_show
    id
  }
}

fragment BackToFairBanner_show on Show {
  partner {
    __typename
    ... on Partner {
      internalID
    }
    ... on ExternalPartner {
      internalID
      id
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
  fair {
    name
    href
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "show-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
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
    "name": "BackToFairBanner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BackToFairBanner_show"
          }
        ],
        "storageKey": "show(id:\"show-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BackToFairBanner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
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
                  (v1/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fair",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "href",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "show(id:\"show-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "33edc0511b95776a9f421b4afc99de22",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "show.fair.href": (v3/*: any*/),
        "show.fair.id": (v4/*: any*/),
        "show.fair.name": (v3/*: any*/),
        "show.id": (v4/*: any*/),
        "show.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "show.partner.__isNode": (v5/*: any*/),
        "show.partner.__typename": (v5/*: any*/),
        "show.partner.id": (v4/*: any*/),
        "show.partner.internalID": (v4/*: any*/)
      }
    },
    "name": "BackToFairBanner_Test_Query",
    "operationKind": "query",
    "text": "query BackToFairBanner_Test_Query {\n  show(id: \"show-id\") {\n    ...BackToFairBanner_show\n    id\n  }\n}\n\nfragment BackToFairBanner_show on Show {\n  partner {\n    __typename\n    ... on Partner {\n      internalID\n    }\n    ... on ExternalPartner {\n      internalID\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  fair {\n    name\n    href\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '52f47020325199c51fd1895e9c5dfa38';
export default node;
