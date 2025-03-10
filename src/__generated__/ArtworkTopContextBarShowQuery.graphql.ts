/**
 * @generated SignedSource<<86c0b76c1d1e95f3a259037515d1f5c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ArtworkTopContextBarShowQuery$variables = {
  id: string;
};
export type ArtworkTopContextBarShowQuery$data = {
  readonly show: {
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
    readonly partner: {
      readonly name?: string | null | undefined;
    } | null | undefined;
    readonly status: string | null | undefined;
    readonly thumbnail: {
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ArtworkTopContextBarShowQuery = {
  response: ArtworkTopContextBarShowQuery$data;
  variables: ArtworkTopContextBarShowQuery$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
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
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": "thumbnail",
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "coverImage",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = [
  (v2/*: any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "Partner",
  "abstractKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkTopContextBarShowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "ExternalPartner",
                "abstractKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkTopContextBarShowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
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
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v8/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c21502dcb59526224d149d0d6c4ddb7a",
    "id": null,
    "metadata": {},
    "name": "ArtworkTopContextBarShowQuery",
    "operationKind": "query",
    "text": "query ArtworkTopContextBarShowQuery(\n  $id: String!\n) {\n  show(id: $id) {\n    name\n    href\n    status\n    thumbnail: coverImage {\n      url\n    }\n    partner {\n      __typename\n      ... on Partner {\n        name\n      }\n      ... on ExternalPartner {\n        name\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "267621eff519dada63cb46956572190e";

export default node;
