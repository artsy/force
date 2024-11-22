/**
 * @generated SignedSource<<9db021eb66e5ff18527db3cecaf7b70a>>
 * @relayHash 16353554fe0fe298641e341233d14e31
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 16353554fe0fe298641e341233d14e31

import { ConcreteRequest, Query } from 'relay-runtime';
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
    "id": "16353554fe0fe298641e341233d14e31",
    "metadata": {},
    "name": "useArtworkListsArtworkSaveStatesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "de4d7657569e7a12cda985b315f805d5";

export default node;
