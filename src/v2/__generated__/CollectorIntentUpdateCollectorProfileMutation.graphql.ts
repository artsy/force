/**
 * @generated SignedSource<<bff8bf860b42d7ce3ebc2921740e8ffa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Intents = "BUY_ART_AND_DESIGN" | "FIND_ART_EXHIBITS" | "LEARN_ABOUT_ART" | "READ_ART_MARKET_NEWS" | "RESEARCH_ART_PRICES" | "SELL_ART_AND_DESIGN" | "%future added value";
export type UpdateCollectorProfileInput = {
  affiliatedAuctionHouseIds?: ReadonlyArray<string | null> | null;
  affiliatedFairIds?: ReadonlyArray<string | null> | null;
  affiliatedGalleryIds?: ReadonlyArray<string | null> | null;
  clientMutationId?: string | null;
  institutionalAffiliations?: string | null;
  intents?: ReadonlyArray<Intents | null> | null;
  loyaltyApplicant?: boolean | null;
  professionalBuyer?: boolean | null;
  selfReportedPurchases?: string | null;
};
export type CollectorIntentUpdateCollectorProfileMutation$variables = {
  input: UpdateCollectorProfileInput;
};
export type CollectorIntentUpdateCollectorProfileMutation$data = {
  readonly updateCollectorProfile: {
    readonly intents: ReadonlyArray<string | null> | null;
  } | null;
};
export type CollectorIntentUpdateCollectorProfileMutation = {
  variables: CollectorIntentUpdateCollectorProfileMutation$variables;
  response: CollectorIntentUpdateCollectorProfileMutation$data;
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
    "type": "Mutation",
    "abstractKey": null
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
    "cacheID": "615cbc0019b26c0dff02e3765875106d",
    "id": null,
    "metadata": {},
    "name": "CollectorIntentUpdateCollectorProfileMutation",
    "operationKind": "mutation",
    "text": "mutation CollectorIntentUpdateCollectorProfileMutation(\n  $input: UpdateCollectorProfileInput!\n) {\n  updateCollectorProfile(input: $input) {\n    intents\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7587732c7a2cfaaf18f92a3330980598";

export default node;
