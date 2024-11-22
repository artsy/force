/**
 * @generated SignedSource<<b57e990e1d46d194ee005b1a9b707083>>
 * @relayHash efdfd6208655f35385d6e75981131e14
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID efdfd6208655f35385d6e75981131e14

import { ConcreteRequest, Query } from 'relay-runtime';
export type useSaveArtworkToListsArtworkListInclusionQuery$variables = {
  artworkID: string;
};
export type useSaveArtworkToListsArtworkListInclusionQuery$data = {
  readonly artwork: {
    readonly isSavedToList: boolean;
  } | null | undefined;
};
export type useSaveArtworkToListsArtworkListInclusionQuery = {
  response: useSaveArtworkToListsArtworkListInclusionQuery$data;
  variables: useSaveArtworkToListsArtworkListInclusionQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSaveArtworkToListsArtworkListInclusionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "useSaveArtworkToListsArtworkListInclusionQuery",
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
    "id": "efdfd6208655f35385d6e75981131e14",
    "metadata": {},
    "name": "useSaveArtworkToListsArtworkListInclusionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "19960ec09e5ed8f381d6fff35335bcd6";

export default node;
