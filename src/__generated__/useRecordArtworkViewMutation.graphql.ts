/**
 * @generated SignedSource<<6b32dd9c6da6cd44ccf7a594704b0c6f>>
 * @relayHash 1878a771aa159ee5adf200a2f061815d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1878a771aa159ee5adf200a2f061815d

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useRecordArtworkViewMutation$variables = {
  artworkID: string;
};
export type useRecordArtworkViewMutation$data = {
  readonly recordArtworkView: {
    readonly artwork_id: string;
  } | null | undefined;
};
export type useRecordArtworkViewMutation = {
  response: useRecordArtworkViewMutation$data;
  variables: useRecordArtworkViewMutation$variables;
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
    "id": "1878a771aa159ee5adf200a2f061815d",
    "metadata": {},
    "name": "useRecordArtworkViewMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "72efc43f89c40e5d308f495b42ff8f26";

export default node;
