/**
 * @generated SignedSource<<96695c47b368cfd36c2aa9f2526b9eae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneFamilies_Test_Query$variables = Record<PropertyKey, never>;
export type GeneFamilies_Test_Query$data = {
  readonly geneFamiliesConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"GeneFamilies_geneFamiliesConnection">;
  } | null | undefined;
};
export type GeneFamilies_Test_Query = {
  response: GeneFamilies_Test_Query$data;
  variables: GeneFamilies_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
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
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
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
    "name": "GeneFamilies_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "GeneFamilyConnection",
        "kind": "LinkedField",
        "name": "geneFamiliesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneFamilies_geneFamiliesConnection"
          }
        ],
        "storageKey": "geneFamiliesConnection(first:20)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GeneFamilies_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                    "name": "internalID",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Gene",
                    "kind": "LinkedField",
                    "name": "genes",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPublished",
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayName",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
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
    ]
  },
  "params": {
    "cacheID": "2a90f21b2ffb40eb036bc02bc2cded7e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "geneFamiliesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GeneFamilyConnection"
        },
        "geneFamiliesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "GeneFamilyEdge"
        },
        "geneFamiliesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GeneFamily"
        },
        "geneFamiliesConnection.edges.node.genes": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Gene"
        },
        "geneFamiliesConnection.edges.node.genes.displayName": (v4/*: any*/),
        "geneFamiliesConnection.edges.node.genes.id": (v5/*: any*/),
        "geneFamiliesConnection.edges.node.genes.isPublished": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "geneFamiliesConnection.edges.node.genes.name": (v4/*: any*/),
        "geneFamiliesConnection.edges.node.genes.slug": (v5/*: any*/),
        "geneFamiliesConnection.edges.node.id": (v5/*: any*/),
        "geneFamiliesConnection.edges.node.internalID": (v5/*: any*/),
        "geneFamiliesConnection.edges.node.name": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "geneFamiliesConnection.edges.node.slug": (v5/*: any*/)
      }
    },
    "name": "GeneFamilies_Test_Query",
    "operationKind": "query",
    "text": "query GeneFamilies_Test_Query {\n  geneFamiliesConnection(first: 20) {\n    ...GeneFamilies_geneFamiliesConnection\n  }\n}\n\nfragment GeneFamilies_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      ...GeneFamily_geneFamily\n      id\n    }\n  }\n}\n\nfragment GeneFamily_geneFamily on GeneFamily {\n  id\n  slug\n  name\n  genes {\n    isPublished\n    id\n    displayName\n    name\n    slug\n  }\n}\n"
  }
};
})();

(node as any).hash = "16c50aafe32cc4666052ea8ccda8aacf";

export default node;
