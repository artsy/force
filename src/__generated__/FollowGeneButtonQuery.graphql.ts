/**
 * @generated SignedSource<<a55929832225fce2604934cd580139eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FollowGeneButtonQuery$variables = {
  id: string;
};
export type FollowGeneButtonQuery$data = {
  readonly gene: {
    readonly id: string;
    readonly internalID: string;
    readonly isFollowed: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined;
};
export type FollowGeneButtonQuery = {
  response: FollowGeneButtonQuery$data;
  variables: FollowGeneButtonQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowGeneButtonQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowGeneButtonQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f3c2546292fdcda08a044a09eb9d2c30",
    "id": null,
    "metadata": {},
    "name": "FollowGeneButtonQuery",
    "operationKind": "query",
    "text": "query FollowGeneButtonQuery(\n  $id: String!\n) {\n  gene(id: $id) {\n    id\n    slug\n    name\n    internalID\n    isFollowed\n  }\n}\n"
  }
};
})();

(node as any).hash = "09ff43dfa0c181c098e396cfbb61be2c";

export default node;
