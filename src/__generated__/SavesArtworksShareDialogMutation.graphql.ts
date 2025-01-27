/**
 * @generated SignedSource<<de4a815b6ee6171559645ed9cebedc23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type updateCollectionInput = {
  clientMutationId?: string | null | undefined;
  id: string;
  name?: string | null | undefined;
  private?: boolean | null | undefined;
  shareableWithPartners?: boolean | null | undefined;
};
export type SavesArtworksShareDialogMutation$variables = {
  input: updateCollectionInput;
};
export type SavesArtworksShareDialogMutation$data = {
  readonly updateCollection: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type SavesArtworksShareDialogMutation = {
  response: SavesArtworksShareDialogMutation$data;
  variables: SavesArtworksShareDialogMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "updateCollectionPayload",
    "kind": "LinkedField",
    "name": "updateCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
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
    "name": "SavesArtworksShareDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SavesArtworksShareDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2cf2d9491342743ff93bd43999350a4e",
    "id": null,
    "metadata": {},
    "name": "SavesArtworksShareDialogMutation",
    "operationKind": "mutation",
    "text": "mutation SavesArtworksShareDialogMutation(\n  $input: updateCollectionInput!\n) {\n  updateCollection(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "9644ad04e796418b9c7cbb0aba67683a";

export default node;
