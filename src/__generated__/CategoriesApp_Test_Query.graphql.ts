/**
 * @generated SignedSource<<54ee60cb8bff477bce0aa4157c1d9349>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoriesApp_Test_Query$variables = Record<PropertyKey, never>;
export type CategoriesApp_Test_Query$data = {
  readonly geneFamiliesConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"CategoriesApp_geneFamiliesConnection">;
  } | null | undefined;
};
export type CategoriesApp_Test_Query = {
  response: CategoriesApp_Test_Query$data;
  variables: CategoriesApp_Test_Query$variables;
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
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
    "name": "CategoriesApp_Test_Query",
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
            "name": "CategoriesApp_geneFamiliesConnection"
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
    "name": "CategoriesApp_Test_Query",
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayName",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v1/*: any*/)
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
    "cacheID": "dbca649d5251c369bbfc4ec14a7b974a",
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
    "name": "CategoriesApp_Test_Query",
    "operationKind": "query",
    "text": "query CategoriesApp_Test_Query {\n  geneFamiliesConnection(first: 20) {\n    ...CategoriesApp_geneFamiliesConnection\n  }\n}\n\nfragment CategoriesApp_geneFamiliesConnection on GeneFamilyConnection {\n  ...StickyNav_geneFamiliesConnection\n  ...GeneFamilies_geneFamiliesConnection\n}\n\nfragment GeneFamilies_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      ...GeneFamily_geneFamily\n      id\n    }\n  }\n}\n\nfragment GeneFamily_geneFamily on GeneFamily {\n  id\n  slug\n  name\n  genes {\n    isPublished\n    id\n    displayName\n    name\n    slug\n  }\n}\n\nfragment StickyNav_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      slug\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "59bcc4dc0101c4b7d18d920d14968697";

export default node;
