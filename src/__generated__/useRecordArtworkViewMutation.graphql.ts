/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type useRecordArtworkViewMutationVariables = {
    artworkID: string;
};
export type useRecordArtworkViewMutationResponse = {
    readonly recordArtworkView: {
        readonly artwork_id: string;
    } | null;
};
export type useRecordArtworkViewMutation = {
    readonly response: useRecordArtworkViewMutationResponse;
    readonly variables: useRecordArtworkViewMutationVariables;
};



/*
mutation useRecordArtworkViewMutation(
  $artworkID: String!
) {
  recordArtworkView(input: {artwork_id: $artworkID}) {
    artwork_id
  }
}
*/

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
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "artwork_id",
            "variableName": "artworkID"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RecordArtworkViewPayload",
    "kind": "LinkedField",
    "name": "recordArtworkView",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "artwork_id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useRecordArtworkViewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useRecordArtworkViewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1878a771aa159ee5adf200a2f061815d",
    "id": null,
    "metadata": {},
    "name": "useRecordArtworkViewMutation",
    "operationKind": "mutation",
    "text": "mutation useRecordArtworkViewMutation(\n  $artworkID: String!\n) {\n  recordArtworkView(input: {artwork_id: $artworkID}) {\n    artwork_id\n  }\n}\n"
  }
};
})();
(node as any).hash = '72efc43f89c40e5d308f495b42ff8f26';
export default node;
