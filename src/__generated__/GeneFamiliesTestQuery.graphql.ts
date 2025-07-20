/**
 * @generated SignedSource<<d7807109cb8ac78ba1f889fd4ae173ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneFamiliesTestQuery$variables = Record<PropertyKey, never>;
export type GeneFamiliesTestQuery$data = {
  readonly geneFamiliesConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"GeneFamilies_geneFamiliesConnection">;
  } | null | undefined;
};
export type GeneFamiliesTestQuery = {
  response: GeneFamiliesTestQuery$data;
  variables: GeneFamiliesTestQuery$variables;
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
    "name": "GeneFamiliesTestQuery",
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
    "name": "GeneFamiliesTestQuery",
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
    "cacheID": "22d63fa93f8fb1df4a20cba50deaa2b3",
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
    "name": "GeneFamiliesTestQuery",
    "operationKind": "query",
    "text": "query GeneFamiliesTestQuery {\n  geneFamiliesConnection(first: 20) {\n    ...GeneFamilies_geneFamiliesConnection\n  }\n}\n\nfragment GeneFamilies_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      ...GeneFamily_geneFamily\n      id\n    }\n  }\n}\n\nfragment GeneFamily_geneFamily on GeneFamily {\n  id\n  slug\n  name\n  genes {\n    isPublished\n    id\n    displayName\n    name\n    slug\n  }\n}\n"
  }
};
})();

(node as any).hash = "f2887591b4732bf6aee46969ba9ff88e";

export default node;
