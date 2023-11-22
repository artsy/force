/**
 * @generated SignedSource<<9acca353446dbe52bc1801a2e97ffb5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type viewingRoomRoutes_ViewingRoomQuery$variables = {
  slug: string;
};
export type viewingRoomRoutes_ViewingRoomQuery$data = {
  readonly viewingRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomApp_viewingRoom">;
  } | null | undefined;
};
export type viewingRoomRoutes_ViewingRoomQuery = {
  response: viewingRoomRoutes_ViewingRoomQuery$data;
  variables: viewingRoomRoutes_ViewingRoomQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "viewingRoomRoutes_ViewingRoomQuery",
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
    "name": "viewingRoomRoutes_ViewingRoomQuery",
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
    "cacheID": "e75d71d95e16fb9a7350b6f19115a139",
    "id": null,
    "metadata": {},
    "name": "viewingRoomRoutes_ViewingRoomQuery",
    "operationKind": "query",
    "text": "query viewingRoomRoutes_ViewingRoomQuery(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) @principalField {\n    ...ViewingRoomApp_viewingRoom\n  }\n}\n\nfragment ViewingRoomApp_viewingRoom on ViewingRoom {\n  ...ViewingRoomMeta_viewingRoom\n  ...ViewingRoomHeader_viewingRoom\n  ...ViewingRoomContentNotAccessible_viewingRoom\n  internalID\n  status\n  partner {\n    internalID\n    id\n  }\n}\n\nfragment ViewingRoomContentNotAccessible_viewingRoom on ViewingRoom {\n  status\n  partner {\n    href\n    id\n  }\n}\n\nfragment ViewingRoomHeader_viewingRoom on ViewingRoom {\n  image {\n    imageURLs {\n      normalized\n    }\n  }\n  title\n  partner {\n    name\n    href\n    id\n  }\n  distanceToOpen\n  distanceToClose\n  status\n}\n\nfragment ViewingRoomMeta_viewingRoom on ViewingRoom {\n  title\n  href\n  pullQuote\n  image {\n    imageURLs {\n      normalized\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ef9bd45ea7fddd443ff22649736a823d";

export default node;
