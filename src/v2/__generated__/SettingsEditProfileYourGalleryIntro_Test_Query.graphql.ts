/**
 * @generated SignedSource<<67973fe11d5aec7623263e8fbfcd5cd1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileYourGalleryIntro_Test_Query$variables = {};
export type SettingsEditProfileYourGalleryIntro_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileYourGalleryIntro_me">;
  } | null;
};
export type SettingsEditProfileYourGalleryIntro_Test_Query = {
  variables: SettingsEditProfileYourGalleryIntro_Test_Query$variables;
  response: SettingsEditProfileYourGalleryIntro_Test_Query$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditProfileYourGalleryIntro_Test_Query",
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
            "name": "SettingsEditProfileYourGalleryIntro_me"
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
    "name": "SettingsEditProfileYourGalleryIntro_Test_Query",
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
            "kind": "ScalarField",
            "name": "inquiryIntroduction",
            "storageKey": null
          },
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
    "cacheID": "de60e0d2338af6d043dcd9eb847681f3",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "me.inquiryIntroduction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "SettingsEditProfileYourGalleryIntro_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditProfileYourGalleryIntro_Test_Query {\n  me {\n    ...SettingsEditProfileYourGalleryIntro_me\n    id\n  }\n}\n\nfragment SettingsEditProfileYourGalleryIntro_me on Me {\n  inquiryIntroduction\n}\n"
  }
};

(node as any).hash = "21219f0ea58d8e6ca51cb2a38dcd76dd";

export default node;
