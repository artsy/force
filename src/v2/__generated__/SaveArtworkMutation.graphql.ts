/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SaveArtworkInput = {
    artworkID?: string | null;
    clientMutationId?: string | null;
    remove?: boolean | null;
};
export type SaveArtworkMutationVariables = {
    input: SaveArtworkInput;
};
export type SaveArtworkMutationResponse = {
    readonly saveArtwork: {
        readonly artwork: {
            readonly id: string;
            readonly slug: string;
            readonly is_saved: boolean | null;
        } | null;
    } | null;
};
export type SaveArtworkMutation = {
    readonly response: SaveArtworkMutationResponse;
    readonly variables: SaveArtworkMutationVariables;
};



/*
mutation SaveArtworkMutation(
  $input: SaveArtworkInput!
) {
  saveArtwork(input: $input) {
    artwork {
      id
      slug
      is_saved: isSaved
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "SaveArtworkInput!"
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
    "concreteType": "SaveArtworkPayload",
    "kind": "LinkedField",
    "name": "saveArtwork",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "is_saved",
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
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
    "name": "SaveArtworkMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SaveArtworkMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SaveArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation SaveArtworkMutation(\n  $input: SaveArtworkInput!\n) {\n  saveArtwork(input: $input) {\n    artwork {\n      id\n      slug\n      is_saved: isSaved\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0883343afdb4d2132f5b10a72c04d981';
export default node;
