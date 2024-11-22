/**
 * @generated SignedSource<<c86114960fecb9a7941e7c4930e38786>>
 * @relayHash 0296f8d2fba205e2470b55dc43677e1c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0296f8d2fba205e2470b55dc43677e1c

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Intents = "BUY_ART_AND_DESIGN" | "FIND_ART_EXHIBITS" | "LEARN_ABOUT_ART" | "READ_ART_MARKET_NEWS" | "RESEARCH_ART_PRICES" | "SELL_ART_AND_DESIGN" | "%future added value";
export type UpdateCollectorProfileInput = {
  affiliatedAuctionHouseIds?: ReadonlyArray<string | null | undefined> | null | undefined;
  affiliatedFairIds?: ReadonlyArray<string | null | undefined> | null | undefined;
  affiliatedGalleryIds?: ReadonlyArray<string | null | undefined> | null | undefined;
  clientMutationId?: string | null | undefined;
  companyName?: string | null | undefined;
  companyWebsite?: string | null | undefined;
  institutionalAffiliations?: string | null | undefined;
  intents?: ReadonlyArray<Intents | null | undefined> | null | undefined;
  loyaltyApplicant?: boolean | null | undefined;
  professionalBuyer?: boolean | null | undefined;
  promptedForUpdate?: boolean | null | undefined;
  selfReportedPurchases?: string | null | undefined;
};
export type useUpdateCollectorProfileMutation$variables = {
  input: UpdateCollectorProfileInput;
};
export type useUpdateCollectorProfileMutation$data = {
  readonly updateCollectorProfile: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type useUpdateCollectorProfileMutation = {
  response: useUpdateCollectorProfileMutation$data;
  variables: useUpdateCollectorProfileMutation$variables;
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
    "concreteType": "UpdateCollectorProfilePayload",
    "kind": "LinkedField",
    "name": "updateCollectorProfile",
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
    "name": "useUpdateCollectorProfileMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateCollectorProfileMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0296f8d2fba205e2470b55dc43677e1c",
    "metadata": {},
    "name": "useUpdateCollectorProfileMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "9e9cfaf31cf4056cc375de3250127037";

export default node;
