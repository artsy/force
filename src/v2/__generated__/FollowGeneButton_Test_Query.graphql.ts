/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButton_Test_QueryVariables = {};
export type FollowGeneButton_Test_QueryResponse = {
    readonly gene: {
        readonly " $fragmentRefs": FragmentRefs<"FollowGeneButton_gene">;
    } | null;
};
export type FollowGeneButton_Test_Query = {
    readonly response: FollowGeneButton_Test_QueryResponse;
    readonly variables: FollowGeneButton_Test_QueryVariables;
};



/*
query FollowGeneButton_Test_Query {
  gene(id: "example") {
    ...FollowGeneButton_gene
    id
  }
}

fragment FollowGeneButton_gene on Gene {
  id
  slug
  name
  internalID
  isFollowed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowGeneButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FollowGeneButton_gene"
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FollowGeneButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "gene": {
          "type": "Gene",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.id": (v1/*: any*/),
        "gene.slug": (v1/*: any*/),
        "gene.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.internalID": (v1/*: any*/),
        "gene.isFollowed": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "FollowGeneButton_Test_Query",
    "operationKind": "query",
    "text": "query FollowGeneButton_Test_Query {\n  gene(id: \"example\") {\n    ...FollowGeneButton_gene\n    id\n  }\n}\n\nfragment FollowGeneButton_gene on Gene {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n}\n"
  }
};
})();
(node as any).hash = 'ad227555fabebd93865ebe16a7adf77c';
export default node;
