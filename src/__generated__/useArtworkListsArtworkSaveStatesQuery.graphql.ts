/**
 * @generated SignedSource<<b35f2e5e1e5b245b8aa5babb3f26fe0d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useArtworkListsArtworkSaveStatesQuery$variables = {
  artworkID: string;
};
export type useArtworkListsArtworkSaveStatesQuery$data = {
  readonly artwork: {
    readonly isSaved: boolean | null | undefined;
    readonly isSavedToList: boolean;
  } | null | undefined;
};
export type useArtworkListsArtworkSaveStatesQuery = {
  response: useArtworkListsArtworkSaveStatesQuery$data;
  variables: useArtworkListsArtworkSaveStatesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "default",
      "value": false
    }
  ],
  "kind": "ScalarField",
  "name": "isSavedToList",
  "storageKey": "isSavedToList(default:false)"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useArtworkListsArtworkSaveStatesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
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
    "name": "useArtworkListsArtworkSaveStatesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
    "cacheID": "16353554fe0fe298641e341233d14e31",
    "id": null,
    "metadata": {},
    "name": "useArtworkListsArtworkSaveStatesQuery",
    "operationKind": "query",
    "text": "query useArtworkListsArtworkSaveStatesQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    isSavedToList(default: false)\n    isSaved\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "de4d7657569e7a12cda985b315f805d5";

export default node;
