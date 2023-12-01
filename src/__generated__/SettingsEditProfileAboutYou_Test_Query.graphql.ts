/**
 * @generated SignedSource<<d61298587be3d55104f6660df3270804>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileAboutYou_Test_Query$variables = Record<PropertyKey, never>;
export type SettingsEditProfileAboutYou_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileAboutYou_me">;
  } | null | undefined;
};
export type SettingsEditProfileAboutYou_Test_Query = {
  response: SettingsEditProfileAboutYou_Test_Query$data;
  variables: SettingsEditProfileAboutYou_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditProfileAboutYou_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsEditProfileAboutYou_me"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsEditProfileAboutYou_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "profession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shareFollows",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRange",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRangeMin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRangeMax",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "664773dee82fa8d8ec8433acec6db4c1",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v1/*: any*/),
        "me.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "me.location.display": (v2/*: any*/),
        "me.location.id": (v1/*: any*/),
        "me.priceRange": (v2/*: any*/),
        "me.priceRangeMax": (v3/*: any*/),
        "me.priceRangeMin": (v3/*: any*/),
        "me.profession": (v2/*: any*/),
        "me.shareFollows": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "SettingsEditProfileAboutYou_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditProfileAboutYou_Test_Query {\n  me {\n    ...SettingsEditProfileAboutYou_me\n    id\n  }\n}\n\nfragment SettingsEditProfileAboutYou_me on Me {\n  location {\n    display\n    id\n  }\n  profession\n  shareFollows\n  priceRange\n  priceRangeMin\n  priceRangeMax\n}\n"
  }
};
})();

(node as any).hash = "d7efa9d8fdd1fbe69df938aeefb6b431";

export default node;
