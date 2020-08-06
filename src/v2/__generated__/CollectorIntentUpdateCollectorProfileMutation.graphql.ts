/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type Intents = "BUY_ART_AND_DESIGN" | "FIND_ART_EXHIBITS" | "LEARN_ABOUT_ART" | "READ_ART_MARKET_NEWS" | "RESEARCH_ART_PRICES" | "SELL_ART_AND_DESIGN" | "%future added value";
export type UpdateCollectorProfileInput = {
    readonly clientMutationId?: string | null;
    readonly intents?: ReadonlyArray<Intents | null> | null;
    readonly loyaltyApplicant?: boolean | null;
    readonly professionalBuyer?: boolean | null;
    readonly selfReportedPurchases?: string | null;
};
export type CollectorIntentUpdateCollectorProfileMutationVariables = {
    input: UpdateCollectorProfileInput;
};
export type CollectorIntentUpdateCollectorProfileMutationResponse = {
    readonly updateCollectorProfile: {
        readonly intents: ReadonlyArray<string | null> | null;
    } | null;
};
export type CollectorIntentUpdateCollectorProfileMutation = {
    readonly response: CollectorIntentUpdateCollectorProfileMutationResponse;
    readonly variables: CollectorIntentUpdateCollectorProfileMutationVariables;
};



/*
mutation CollectorIntentUpdateCollectorProfileMutation(
  $input: UpdateCollectorProfileInput!
) {
  updateCollectorProfile(input: $input) {
    intents
    id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "intents",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateCollectorProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCollectorProfilePayload",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateCollectorProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCollectorProfilePayload",
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
  },
  "params": {
    "operationKind": "mutation",
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "id": null,
    "text": "mutation CollectorIntentUpdateCollectorProfileMutation(\n  $input: UpdateCollectorProfileInput!\n) {\n  updateCollectorProfile(input: $input) {\n    intents\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7587732c7a2cfaaf18f92a3330980598';
export default node;
