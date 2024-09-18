/**
 * @generated SignedSource<<d56759582d7b006f0a276c759f14c7b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FollowGeneButton_Test_Query$variables = Record<PropertyKey, never>;
export type FollowGeneButton_Test_Query$data = {
  readonly gene: {
    readonly href: string | null | undefined;
    readonly id: string;
    readonly isFollowed: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined;
};
export type FollowGeneButton_Test_Query = {
  response: FollowGeneButton_Test_Query$data;
  variables: FollowGeneButton_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "example"
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
        "name": "href",
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
        "name": "isFollowed",
        "storageKey": null
      }
    ],
    "storageKey": "gene(id:\"example\")"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v2 = {
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
    "name": "FollowGeneButton_Test_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FollowGeneButton_Test_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fe9183a7b327b8924c17838cab101f04",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "gene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "gene.href": (v1/*: any*/),
        "gene.id": (v2/*: any*/),
        "gene.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "gene.name": (v1/*: any*/),
        "gene.slug": (v2/*: any*/)
      }
    },
    "name": "FollowGeneButton_Test_Query",
    "operationKind": "query",
    "text": "query FollowGeneButton_Test_Query {\n  gene(id: \"example\") {\n    id\n    slug\n    href\n    name\n    isFollowed\n  }\n}\n"
  }
};
})();

(node as any).hash = "17f70749ba1de301b75f4642db44762c";

export default node;
