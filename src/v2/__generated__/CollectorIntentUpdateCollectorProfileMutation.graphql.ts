/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type Intents = "BUY_ART_AND_DESIGN" | "FIND_ART_EXHIBITS" | "LEARN_ABOUT_ART" | "READ_ART_MARKET_NEWS" | "RESEARCH_ART_PRICES" | "SELL_ART_AND_DESIGN" | "%future added value";
export type UpdateCollectorProfileInput = {
    affiliatedAuctionIds?: Array<string | null> | null;
    affiliatedFairIds?: Array<string | null> | null;
    affiliatedGalleryIds?: Array<string | null> | null;
    clientMutationId?: string | null;
    institutionalAffiliations?: string | null;
    intents?: Array<Intents | null> | null;
    loyaltyApplicant?: boolean | null;
    professionalBuyer?: boolean | null;
    selfReportedPurchases?: string | null;
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateCollectorProfileInput!"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intents",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCollectorProfilePayload",
        "kind": "LinkedField",
        "name": "updateCollectorProfile",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCollectorProfilePayload",
        "kind": "LinkedField",
        "name": "updateCollectorProfile",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "operationKind": "mutation",
    "text": "mutation CollectorIntentUpdateCollectorProfileMutation(\n  $input: UpdateCollectorProfileInput!\n) {\n  updateCollectorProfile(input: $input) {\n    intents\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '7587732c7a2cfaaf18f92a3330980598';
export default node;
