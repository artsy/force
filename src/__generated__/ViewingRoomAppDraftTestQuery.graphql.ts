/**
 * @generated SignedSource<<06be43eb8f5c4220b724c1bca3966f6d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomAppDraftTestQuery$variables = {
  slug: string;
};
export type ViewingRoomAppDraftTestQuery$data = {
  readonly viewingRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomApp_viewingRoom">;
  } | null | undefined;
};
export type ViewingRoomAppDraftTestQuery$rawResponse = {
  readonly viewingRoom: {
    readonly distanceToClose: string | null | undefined;
    readonly distanceToOpen: string | null | undefined;
    readonly endAt: string | null | undefined;
    readonly href: string | null | undefined;
    readonly image: {
      readonly imageURLs: {
        readonly normalized: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly introStatement: string | null | undefined;
    readonly partner: {
      readonly href: string | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly pullQuote: string | null | undefined;
    readonly startAt: string | null | undefined;
    readonly status: string;
    readonly title: string;
  } | null | undefined;
};
export type ViewingRoomAppDraftTestQuery = {
  rawResponse: ViewingRoomAppDraftTestQuery$rawResponse;
  response: ViewingRoomAppDraftTestQuery$data;
  variables: ViewingRoomAppDraftTestQuery$variables;
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
    "name": "ViewingRoomAppDraftTestQuery",
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
    "name": "ViewingRoomAppDraftTestQuery",
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
            "concreteType": "GravityARImage",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GravityImageURLs",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "introStatement",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0839dd1e2f865f15b3cc047eb67acc74",
    "id": null,
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
        "viewingRoom.endAt": (v4/*: any*/),
        "viewingRoom.href": (v4/*: any*/),
        "viewingRoom.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GravityARImage"
        },
        "viewingRoom.image.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GravityImageURLs"
        },
        "viewingRoom.image.imageURLs.normalized": (v4/*: any*/),
        "viewingRoom.internalID": (v5/*: any*/),
        "viewingRoom.introStatement": (v4/*: any*/),
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
        "viewingRoom.startAt": (v4/*: any*/),
        "viewingRoom.status": (v6/*: any*/),
        "viewingRoom.title": (v6/*: any*/)
      }
    },
    "name": "ViewingRoomAppDraftTestQuery",
    "operationKind": "query",
    "text": "query ViewingRoomAppDraftTestQuery(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomApp_viewingRoom\n  }\n}\n\nfragment ViewingRoomApp_viewingRoom on ViewingRoom {\n  ...ViewingRoomMeta_viewingRoom\n  ...ViewingRoomHeader_viewingRoom\n  ...ViewingRoomContentNotAccessible_viewingRoom\n  ...ViewingRoomStructuredData_viewingRoom\n  internalID\n  status\n  partner {\n    internalID\n    id\n  }\n}\n\nfragment ViewingRoomContentNotAccessible_viewingRoom on ViewingRoom {\n  status\n  partner {\n    href\n    id\n  }\n}\n\nfragment ViewingRoomHeader_viewingRoom on ViewingRoom {\n  image {\n    imageURLs {\n      normalized\n    }\n  }\n  title\n  partner {\n    name\n    href\n    id\n  }\n  distanceToOpen\n  distanceToClose\n  status\n}\n\nfragment ViewingRoomMeta_viewingRoom on ViewingRoom {\n  title\n  href\n  pullQuote\n  image {\n    imageURLs {\n      normalized\n    }\n  }\n}\n\nfragment ViewingRoomStructuredData_viewingRoom on ViewingRoom {\n  title\n  href\n  introStatement\n  startAt\n  endAt\n  status\n  image {\n    imageURLs {\n      normalized\n    }\n  }\n  partner {\n    name\n    href\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fcb9b5a3f522a7c7a6b50e3c8bb96544";

export default node;
