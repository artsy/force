/**
 * @generated SignedSource<<4ca97fbdaf29ad023888cc74975636c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientMutationId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateCollectorProfileMutation",
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
    "name": "useUpdateCollectorProfileMutation",
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
    "cacheID": "725af792eb48403e9c0e1dce39d30b34",
    "id": null,
    "metadata": {},
    "name": "useUpdateCollectorProfileMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCollectorProfileMutation(\n  $input: UpdateCollectorProfileInput!\n) {\n  updateCollectorProfile(input: $input) {\n    clientMutationId\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e9cfaf31cf4056cc375de3250127037";

export default node;
