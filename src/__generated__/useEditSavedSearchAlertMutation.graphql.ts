/**
 * @generated SignedSource<<8a7eeec741f657988a7ba2ac05c1bccc>>
 * @relayHash 2e55e43636430de4eefcf034e62cfea9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2e55e43636430de4eefcf034e62cfea9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AlertSettingsFrequency = "DAILY" | "INSTANT" | "%future added value";
export type updateAlertInput = {
  acquireable?: boolean | null | undefined;
  additionalGeneIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  artistIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  artistSeriesIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  atAuction?: boolean | null | undefined;
  attributionClass?: ReadonlyArray<string | null | undefined> | null | undefined;
  clientMutationId?: string | null | undefined;
  colors?: ReadonlyArray<string | null | undefined> | null | undefined;
  dimensionRange?: string | null | undefined;
  height?: string | null | undefined;
  id: string;
  inquireableOnly?: boolean | null | undefined;
  keyword?: string | null | undefined;
  locationCities?: ReadonlyArray<string | null | undefined> | null | undefined;
  majorPeriods?: ReadonlyArray<string | null | undefined> | null | undefined;
  materialsTerms?: ReadonlyArray<string | null | undefined> | null | undefined;
  offerable?: boolean | null | undefined;
  partnerIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  priceRange?: string | null | undefined;
  settings?: AlertSettingsInput | null | undefined;
  sizes?: ReadonlyArray<string | null | undefined> | null | undefined;
  width?: string | null | undefined;
};
export type AlertSettingsInput = {
  details?: string | null | undefined;
  email?: boolean | null | undefined;
  frequency?: AlertSettingsFrequency | null | undefined;
  name?: string | null | undefined;
  push?: boolean | null | undefined;
};
export type useEditSavedSearchAlertMutation$variables = {
  input: updateAlertInput;
};
export type useEditSavedSearchAlertMutation$data = {
  readonly updateAlert: {
    readonly responseOrError: {
      readonly alert?: {
        readonly internalID: string;
        readonly settings: {
          readonly name: string | null | undefined;
        };
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useEditSavedSearchAlertMutation = {
  response: useEditSavedSearchAlertMutation$data;
  variables: useEditSavedSearchAlertMutation$variables;
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "AlertSettings",
  "kind": "LinkedField",
  "name": "settings",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useEditSavedSearchAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateAlertPayload",
        "kind": "LinkedField",
        "name": "updateAlert",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Alert",
                    "kind": "LinkedField",
                    "name": "alert",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "UpdateAlertSuccess",
                "abstractKey": null
              }
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
    "name": "useEditSavedSearchAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateAlertPayload",
        "kind": "LinkedField",
        "name": "updateAlert",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Alert",
                    "kind": "LinkedField",
                    "name": "alert",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
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
                ],
                "type": "UpdateAlertSuccess",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "2e55e43636430de4eefcf034e62cfea9",
    "metadata": {},
    "name": "useEditSavedSearchAlertMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "825327cbbe26e00ee9810501cc376585";

export default node;
