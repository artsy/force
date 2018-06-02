/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type Intents = "BUY_ART_AND_DESIGN" | "FIND_ART_EXHIBITS" | "LEARN_ABOUT_ART" | "READ_ART_MARKET_NEWS" | "RESEARCH_ART_PRICES" | "SELL_ART_AND_DESIGN" | "%future added value";
export type CollectorIntentUpdateCollectorProfileMutationVariables = {
    readonly input: {
        readonly loyalty_applicant: boolean | null;
        readonly professional_buyer: boolean | null;
        readonly self_reported_purchases: string | null;
        readonly intents: ReadonlyArray<Intents | null> | null;
        readonly clientMutationId: string | null;
    };
};
export type CollectorIntentUpdateCollectorProfileMutationResponse = {
    readonly updateCollectorProfile: ({
        readonly intents: ReadonlyArray<string | null> | null;
    }) | null;
};



/*
mutation CollectorIntentUpdateCollectorProfileMutation(
  $input: UpdateCollectorProfileInput!
) {
  updateCollectorProfile(input: $input) {
    intents
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateCollectorProfileInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateCollectorProfile",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "UpdateCollectorProfileInput!"
      }
    ],
    "concreteType": "UpdateCollectorProfilePayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "intents",
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
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CollectorIntentUpdateCollectorProfileMutation",
  "id": null,
  "text": "mutation CollectorIntentUpdateCollectorProfileMutation(\n  $input: UpdateCollectorProfileInput!\n) {\n  updateCollectorProfile(input: $input) {\n    intents\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '7587732c7a2cfaaf18f92a3330980598';
export default node;
