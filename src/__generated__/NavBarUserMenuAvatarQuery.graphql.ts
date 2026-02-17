/**
 * @generated SignedSource<<e723f720cf3916f42eac5d1c5b22d39a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type NavBarUserMenuAvatarQuery$variables = Record<PropertyKey, never>;
export type NavBarUserMenuAvatarQuery$data = {
  readonly me: {
    readonly icon: {
      readonly resized: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly initials: string | null | undefined;
  } | null | undefined;
};
export type NavBarUserMenuAvatarQuery = {
  response: NavBarUserMenuAvatarQuery$data;
  variables: NavBarUserMenuAvatarQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "icon",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "cachePolicy",
          "value": "short"
        },
        {
          "kind": "Literal",
          "name": "height",
          "value": 45
        },
        {
          "kind": "Literal",
          "name": "version",
          "value": "large_square"
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 45
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "srcSet",
          "storageKey": null
        }
      ],
      "storageKey": "resized(cachePolicy:\"short\",height:45,version:\"large_square\",width:45)"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarUserMenuAvatarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
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
    "name": "NavBarUserMenuAvatarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
    "cacheID": "a550ae76257ba6b78512dede97c30c1b",
    "id": null,
    "metadata": {},
    "name": "NavBarUserMenuAvatarQuery",
    "operationKind": "query",
    "text": "query NavBarUserMenuAvatarQuery {\n  me {\n    initials\n    icon {\n      resized(height: 45, width: 45, version: \"large_square\", cachePolicy: \"short\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ac98ef1c1c3abc1625bca21e49f1b4d1";

export default node;
