/**
 * @generated SignedSource<<1951ff6768cd49b3e511a2d40a940ed9>>
 * @relayHash 122843e903462b51a41a651da97e8e90
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 122843e903462b51a41a651da97e8e90

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type updateMeCollectionsMutationInput = {
  attributes: ReadonlyArray<UpdateMeCollectionInput>;
  clientMutationId?: string | null | undefined;
};
export type UpdateMeCollectionInput = {
  id: string;
  shareableWithPartners: boolean;
};
export type useUpdateMeCollectionMutation$variables = {
  input: updateMeCollectionsMutationInput;
};
export type useUpdateMeCollectionMutation$data = {
  readonly updateMeCollectionsMutation: {
    readonly meCollectionsOrErrors: ReadonlyArray<{
      readonly collection?: {
        readonly artworksCount: number;
        readonly id: string;
        readonly name: string;
        readonly shareableWithPartners: boolean;
      } | null | undefined;
      readonly mutationError?: {
        readonly message: string;
        readonly type: string | null | undefined;
      } | null | undefined;
    }>;
  } | null | undefined;
};
export type useUpdateMeCollectionMutation = {
  response: useUpdateMeCollectionMutation$data;
  variables: useUpdateMeCollectionMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Collection",
      "kind": "LinkedField",
      "name": "collection",
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
          "name": "shareableWithPartners",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworksCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UpdateMeCollectionsSuccess",
  "abstractKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UpdateMeCollectionsFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateMeCollectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateMeCollectionsMutationPayload",
        "kind": "LinkedField",
        "name": "updateMeCollectionsMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "meCollectionsOrErrors",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateMeCollectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateMeCollectionsMutationPayload",
        "kind": "LinkedField",
        "name": "updateMeCollectionsMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "meCollectionsOrErrors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "122843e903462b51a41a651da97e8e90",
    "metadata": {},
    "name": "useUpdateMeCollectionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4c98ec338ef25bdbd49821856b6356f0";

export default node;
