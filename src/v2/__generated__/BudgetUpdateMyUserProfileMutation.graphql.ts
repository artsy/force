/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UpdateMyProfileInput = {
    readonly clientMutationId?: string | null;
    readonly collectorLevel?: number | null;
    readonly email?: string | null;
    readonly location?: EditableLocation | null;
    readonly name?: string | null;
    readonly phone?: string | null;
    readonly priceRangeMax?: number | null;
    readonly priceRangeMin?: number | null;
    readonly receiveLotOpeningSoonNotification?: boolean | null;
    readonly receiveNewSalesNotification?: boolean | null;
    readonly receiveNewWorksNotification?: boolean | null;
    readonly receiveOutbidNotification?: boolean | null;
    readonly receivePromotionNotification?: boolean | null;
    readonly receivePurchaseNotification?: boolean | null;
    readonly receiveSaleOpeningClosingNotification?: boolean | null;
};
export type EditableLocation = {
    readonly address?: string | null;
    readonly address2?: string | null;
    readonly city?: string | null;
    readonly country?: string | null;
    readonly postalCode?: string | null;
    readonly state?: string | null;
    readonly stateCode?: string | null;
    readonly summary?: string | null;
};
export type BudgetUpdateMyUserProfileMutationVariables = {
    input: UpdateMyProfileInput;
};
export type BudgetUpdateMyUserProfileMutationResponse = {
    readonly updateMyUserProfile: {
        readonly user: {
            readonly name: string;
        } | null;
    } | null;
};
export type BudgetUpdateMyUserProfileMutation = {
    readonly response: BudgetUpdateMyUserProfileMutationResponse;
    readonly variables: BudgetUpdateMyUserProfileMutationVariables;
};



/*
mutation BudgetUpdateMyUserProfileMutation(
  $input: UpdateMyProfileInput!
) {
  updateMyUserProfile(input: $input) {
    user {
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateMyProfileInput!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "BudgetUpdateMyUserProfileMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateMyUserProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BudgetUpdateMyUserProfileMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateMyUserProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "BudgetUpdateMyUserProfileMutation",
    "id": null,
    "text": "mutation BudgetUpdateMyUserProfileMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    user {\n      name\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3add187e4e8fcf9910294672b24f47e7';
export default node;
