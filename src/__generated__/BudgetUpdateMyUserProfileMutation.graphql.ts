/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BudgetUpdateMyUserProfileMutationVariables = {
    readonly input: {
        readonly name: string | null;
        readonly email: string | null;
        readonly phone: string | null;
        readonly location: {
            readonly address: string | null;
            readonly address_2: string | null;
            readonly city: string | null;
            readonly country: string | null;
            readonly summary: string | null;
            readonly postal_code: string | null;
            readonly state: string | null;
            readonly state_code: string | null;
        } | null;
        readonly collector_level: number | null;
        readonly price_range_min: number | null;
        readonly price_range_max: number | null;
        readonly clientMutationId: string | null;
    };
};
export type BudgetUpdateMyUserProfileMutationResponse = {
    readonly updateMyUserProfile: ({
        readonly user: ({
            readonly name: string;
        }) | null;
    }) | null;
};



/*
mutation BudgetUpdateMyUserProfileMutation(
  $input: UpdateMyProfileInput!
) {
  updateMyUserProfile(input: $input) {
    user {
      name
      __id
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
    "kind": "LinkedField",
    "alias": null,
    "name": "updateMyUserProfile",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "UpdateMyProfileInput!"
      }
    ],
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "BudgetUpdateMyUserProfileMutation",
  "id": null,
  "text": "mutation BudgetUpdateMyUserProfileMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    user {\n      name\n      __id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BudgetUpdateMyUserProfileMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "BudgetUpdateMyUserProfileMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '3add187e4e8fcf9910294672b24f47e7';
export default node;
