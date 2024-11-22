/**
 * @generated SignedSource<<a39ad3ac8e45519ff3972c9adad99a84>>
 * @relayHash c5456c81f756c13731c3f6b26e60ec8c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c5456c81f756c13731c3f6b26e60ec8c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_ClosedTest_Query$variables = {
  slug: string;
};
export type ViewingRoomApp_ClosedTest_Query$data = {
  readonly viewingRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomApp_viewingRoom">;
  } | null | undefined;
};
export type ViewingRoomApp_ClosedTest_Query$rawResponse = {
  readonly viewingRoom: {
    readonly distanceToClose: string | null | undefined;
    readonly distanceToOpen: string | null | undefined;
    readonly href: string | null | undefined;
    readonly image: {
      readonly imageURLs: {
        readonly normalized: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly partner: {
      readonly href: string | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly pullQuote: string | null | undefined;
    readonly status: string;
    readonly title: string;
  } | null | undefined;
};
export type ViewingRoomApp_ClosedTest_Query = {
  rawResponse: ViewingRoomApp_ClosedTest_Query$rawResponse;
  response: ViewingRoomApp_ClosedTest_Query$data;
  variables: ViewingRoomApp_ClosedTest_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomApp_ClosedTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomApp_viewingRoom"
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
    "name": "ViewingRoomApp_ClosedTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pullQuote",
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
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "distanceToOpen",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "distanceToClose",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c5456c81f756c13731c3f6b26e60ec8c",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewingRoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "viewingRoom.distanceToClose": (v4/*: any*/),
        "viewingRoom.distanceToOpen": (v4/*: any*/),
        "viewingRoom.href": (v4/*: any*/),
        "viewingRoom.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ARImage"
        },
        "viewingRoom.image.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ImageURLs"
        },
        "viewingRoom.image.imageURLs.normalized": (v4/*: any*/),
        "viewingRoom.internalID": (v5/*: any*/),
        "viewingRoom.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewingRoom.partner.href": (v4/*: any*/),
        "viewingRoom.partner.id": (v5/*: any*/),
        "viewingRoom.partner.internalID": (v5/*: any*/),
        "viewingRoom.partner.name": (v4/*: any*/),
        "viewingRoom.pullQuote": (v4/*: any*/),
        "viewingRoom.status": (v6/*: any*/),
        "viewingRoom.title": (v6/*: any*/)
      }
    },
    "name": "ViewingRoomApp_ClosedTest_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5e34e5d32d2037f27a844de6ebad2cb1";

export default node;
