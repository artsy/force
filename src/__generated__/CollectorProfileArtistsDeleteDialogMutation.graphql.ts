/**
 * @generated SignedSource<<63b868b6c80e8a4d2100959331f7ad35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteUserInterestMutationInput = {
  anonymousSessionId?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  id: string;
  sessionID?: string | null | undefined;
};
export type CollectorProfileArtistsDeleteDialogMutation$variables = {
  input: DeleteUserInterestMutationInput;
};
export type CollectorProfileArtistsDeleteDialogMutation$data = {
  readonly deleteUserInterest: {
    readonly me: {
      readonly id: string;
    };
  } | null | undefined;
};
export type CollectorProfileArtistsDeleteDialogMutation = {
  response: CollectorProfileArtistsDeleteDialogMutation$data;
  variables: CollectorProfileArtistsDeleteDialogMutation$variables;
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
    "concreteType": "DeleteUserInterestMutationPayload",
    "kind": "LinkedField",
    "name": "deleteUserInterest",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectorProfileArtistsDeleteDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CollectorProfileArtistsDeleteDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "018f862abd2a74397ffb232922b6b2cd",
    "id": null,
    "metadata": {},
    "name": "CollectorProfileArtistsDeleteDialogMutation",
    "operationKind": "mutation",
    "text": "mutation CollectorProfileArtistsDeleteDialogMutation(\n  $input: DeleteUserInterestMutationInput!\n) {\n  deleteUserInterest(input: $input) {\n    me {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a6c41f0b4e3c4feb6c1ad6e148ba1328";

export default node;
