/**
 * @generated SignedSource<<e5a779454daf5f23017cf9a0cab648f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomSubsections_Test_Query$variables = Record<PropertyKey, never>;
export type ViewingRoomSubsections_Test_Query$data = {
  readonly viewingRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomSubsections_viewingRoom">;
  } | null | undefined;
};
export type ViewingRoomSubsections_Test_Query = {
  response: ViewingRoomSubsections_Test_Query$data;
  variables: ViewingRoomSubsections_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "exmaple"
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
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomSubsections_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomSubsections_viewingRoom"
          }
        ],
        "storageKey": "viewingRoom(id:\"exmaple\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewingRoomSubsections_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomSubsection",
            "kind": "LinkedField",
            "name": "subsections",
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "body",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ARImage",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ImageURLs",
                    "kind": "LinkedField",
                    "name": "imageURLs",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "normalized",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "caption",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "viewingRoom(id:\"exmaple\")"
      }
    ]
  },
  "params": {
    "cacheID": "598bb548b7c8ecfa24439d829b003fdf",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewingRoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "viewingRoom.subsections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ViewingRoomSubsection"
        },
        "viewingRoom.subsections.body": (v1/*: any*/),
        "viewingRoom.subsections.caption": (v1/*: any*/),
        "viewingRoom.subsections.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ARImage"
        },
        "viewingRoom.subsections.image.height": (v2/*: any*/),
        "viewingRoom.subsections.image.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ImageURLs"
        },
        "viewingRoom.subsections.image.imageURLs.normalized": (v1/*: any*/),
        "viewingRoom.subsections.image.width": (v2/*: any*/),
        "viewingRoom.subsections.internalID": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "viewingRoom.subsections.title": (v1/*: any*/)
      }
    },
    "name": "ViewingRoomSubsections_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomSubsections_Test_Query {\n  viewingRoom(id: \"exmaple\") {\n    ...ViewingRoomSubsections_viewingRoom\n  }\n}\n\nfragment ViewingRoomSubsections_viewingRoom on ViewingRoom {\n  subsections {\n    internalID\n    title\n    body\n    image {\n      width\n      height\n      imageURLs {\n        normalized\n      }\n    }\n    caption\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc8f96611276651c7a403a7c60a8693e";

export default node;
