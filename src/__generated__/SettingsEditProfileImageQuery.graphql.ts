/**
 * @generated SignedSource<<d8b527f0d57ef9a7a2b80ccdbfb2abdc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileImageQuery$variables = Record<PropertyKey, never>;
export type SettingsEditProfileImageQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileImage_me">;
  } | null | undefined;
};
export type SettingsEditProfileImageQuery = {
  response: SettingsEditProfileImageQuery$data;
  variables: SettingsEditProfileImageQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditProfileImageQuery",
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
            "name": "SettingsEditProfileImage_me"
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
    "name": "SettingsEditProfileImageQuery",
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
            "name": "initials",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "icon",
            "plural": false,
            "selections": [
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
                "name": "versions",
                "storageKey": null
              },
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
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 100
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
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
                "storageKey": "cropped(cachePolicy:\"short\",height:100,width:100)"
              }
            ],
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
    "cacheID": "59e13b78206c7255f6f07d560ec04944",
    "id": null,
    "metadata": {},
    "name": "SettingsEditProfileImageQuery",
    "operationKind": "query",
    "text": "query SettingsEditProfileImageQuery {\n  me {\n    ...SettingsEditProfileImage_me\n    id\n  }\n}\n\nfragment CollectorProfileHeaderAvatar_me on Me {\n  initials\n  icon {\n    internalID\n    versions\n    cropped(height: 100, width: 100, cachePolicy: \"short\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment SettingsEditProfileImage_me on Me {\n  ...CollectorProfileHeaderAvatar_me\n  initials\n  icon {\n    internalID\n    versions\n    cropped(height: 100, width: 100, cachePolicy: \"short\") {\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};

(node as any).hash = "647d60297741b7586b38fee93bac01a7";

export default node;
