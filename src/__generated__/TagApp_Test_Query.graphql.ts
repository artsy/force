/**
 * @generated SignedSource<<e5531f354e81c8cd80206e99d06e5ff4>>
 * @relayHash 9420ffef9c483186a64e1e0e53001247
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9420ffef9c483186a64e1e0e53001247

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TagApp_Test_Query$variables = Record<PropertyKey, never>;
export type TagApp_Test_Query$data = {
  readonly tag: {
    readonly " $fragmentSpreads": FragmentRefs<"TagApp_tag">;
  } | null | undefined;
};
export type TagApp_Test_Query = {
  response: TagApp_Test_Query$data;
  variables: TagApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TagApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Tag",
        "kind": "LinkedField",
        "name": "tag",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TagApp_tag"
          }
        ],
        "storageKey": "tag(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TagApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Tag",
        "kind": "LinkedField",
        "name": "tag",
        "plural": false,
        "selections": [
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
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 630
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1200
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
                  }
                ],
                "storageKey": "cropped(height:630,width:1200)"
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
        "storageKey": "tag(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": "9420ffef9c483186a64e1e0e53001247",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "tag": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Tag"
        },
        "tag.description": (v1/*: any*/),
        "tag.href": (v1/*: any*/),
        "tag.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "tag.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "tag.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "tag.image.cropped.src": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "tag.name": (v1/*: any*/)
      }
    },
    "name": "TagApp_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "c14ce04dc9d657bb1554f90db208fd43";

export default node;
