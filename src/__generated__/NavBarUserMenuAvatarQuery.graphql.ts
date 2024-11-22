/**
 * @generated SignedSource<<f1d8d04e9e20d5dacef293684aae5a61>>
 * @relayHash 05d876177c9c7a40927ddf8dfcf358c4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 05d876177c9c7a40927ddf8dfcf358c4

import { ConcreteRequest, Query } from 'relay-runtime';
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
      "storageKey": "resized(height:45,version:\"large_square\",width:45)"
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
    "id": "05d876177c9c7a40927ddf8dfcf358c4",
    "metadata": {},
    "name": "NavBarUserMenuAvatarQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "862f026dd09f96bf86ca7adb060f37e9";

export default node;
