/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesApp_Test_QueryVariables = {};
export type CategoriesApp_Test_QueryResponse = {
    readonly geneFamiliesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
            } | null;
        } | null> | null;
    } | null;
};
export type CategoriesApp_Test_Query = {
    readonly response: CategoriesApp_Test_QueryResponse;
    readonly variables: CategoriesApp_Test_QueryVariables;
};



/*
query CategoriesApp_Test_Query {
  geneFamiliesConnection(first: 20) {
    edges {
      node {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 20
      }
    ],
    "concreteType": "GeneFamilyConnection",
    "kind": "LinkedField",
    "name": "geneFamiliesConnection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneFamilyEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GeneFamily",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
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
        ],
        "storageKey": null
      }
    ],
    "storageKey": "geneFamiliesConnection(first:20)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesApp_Test_Query",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesApp_Test_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoriesApp_Test_Query",
    "operationKind": "query",
    "text": "query CategoriesApp_Test_Query {\n  geneFamiliesConnection(first: 20) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '57bfdadf488bd187845723b311ccccd0';
export default node;
