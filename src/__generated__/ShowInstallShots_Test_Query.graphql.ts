/**
 * @generated SignedSource<<0360038801192f94a0f32e3a93087363>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowInstallShots_Test_Query$variables = Record<PropertyKey, never>;
export type ShowInstallShots_Test_Query$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowInstallShots_show">;
  } | null | undefined;
};
export type ShowInstallShots_Test_Query = {
  response: ShowInstallShots_Test_Query$data;
  variables: ShowInstallShots_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
v1 = {
  "kind": "Literal",
  "name": "quality",
  "value": 85
},
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v5 = [
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
  },
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowInstallShots_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowInstallShots_show"
          }
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowInstallShots_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
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
            "args": [
              {
                "kind": "Literal",
                "name": "default",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 100
              }
            ],
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
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
                "name": "caption",
                "storageKey": null
              },
              {
                "alias": "mobile",
                "args": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 200
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": "resized(quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:200)"
              },
              {
                "alias": "desktop",
                "args": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 325
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": "resized(quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:325)"
              },
              {
                "alias": "zoom",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 900
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 900
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": "resized(height:900,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:900)"
              }
            ],
            "storageKey": "images(default:false,size:100)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "cacheID": "90b7fae04cb63ae9411297f879fd8a5a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "show.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "show.images.caption": (v6/*: any*/),
        "show.images.desktop": (v7/*: any*/),
        "show.images.desktop.height": (v8/*: any*/),
        "show.images.desktop.src": (v9/*: any*/),
        "show.images.desktop.srcSet": (v9/*: any*/),
        "show.images.desktop.width": (v8/*: any*/),
        "show.images.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "show.images.mobile": (v7/*: any*/),
        "show.images.mobile.height": (v8/*: any*/),
        "show.images.mobile.width": (v8/*: any*/),
        "show.images.zoom": (v7/*: any*/),
        "show.images.zoom.height": (v8/*: any*/),
        "show.images.zoom.src": (v9/*: any*/),
        "show.images.zoom.srcSet": (v9/*: any*/),
        "show.images.zoom.width": (v8/*: any*/),
        "show.name": (v6/*: any*/)
      }
    },
    "name": "ShowInstallShots_Test_Query",
    "operationKind": "query",
    "text": "query ShowInstallShots_Test_Query {\n  show(id: \"xxx\") {\n    ...ShowInstallShots_show\n    id\n  }\n}\n\nfragment ShowInstallShots_show on Show {\n  name\n  images(default: false, size: 100) {\n    internalID\n    caption\n    mobile: resized(quality: 85, width: 200, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n    }\n    desktop: resized(quality: 85, width: 325, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    zoom: resized(quality: 85, width: 900, height: 900, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c0c1d39b4bf1f57873328a7bce4868c1";

export default node;
