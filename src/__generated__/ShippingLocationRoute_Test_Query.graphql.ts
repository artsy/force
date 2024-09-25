/**
 * @generated SignedSource<<d76be1256a2b05b8960d67c0501a511f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type ShippingLocationRoute_Test_Query$variables = Record<PropertyKey, never>;
export type ShippingLocationRoute_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ShippingLocationRoute_me">;
  } | null | undefined;
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ShippingLocationRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type ShippingLocationRoute_Test_Query$rawResponse = {
  readonly me: {
    readonly addressConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly addressLine1: string;
          readonly addressLine2: string | null | undefined;
          readonly city: string;
          readonly country: string;
          readonly id: string;
          readonly isDefault: boolean;
          readonly postalCode: string | null | undefined;
          readonly region: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly submission: {
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly locationAddress: string | null | undefined;
    readonly locationAddress2: string | null | undefined;
    readonly locationCity: string | null | undefined;
    readonly locationCountry: string | null | undefined;
    readonly locationCountryCode: string | null | undefined;
    readonly locationPostalCode: string | null | undefined;
    readonly locationState: string | null | undefined;
    readonly myCollectionArtworkID: string | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  } | null | undefined;
};
export type ShippingLocationRoute_Test_Query = {
  rawResponse: ShippingLocationRoute_Test_Query$rawResponse;
  response: ShippingLocationRoute_Test_Query$data;
  variables: ShippingLocationRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "submission-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShippingLocationRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShippingLocationRoute_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionRoute_submission"
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShippingLocationRoute_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShippingLocationRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCountry",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCountryCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationState",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationPostalCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationAddress",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationAddress2",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "externalId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "myCollectionArtworkID",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "submission(id:\"submission-id\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserAddressConnection",
            "kind": "LinkedField",
            "name": "addressConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserAddressEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserAddress",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine1",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine2",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "country",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDefault",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "postalCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "region",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "080056e2e77867c8c3f858556e9af4b4",
    "id": null,
    "metadata": {},
    "name": "ShippingLocationRoute_Test_Query",
    "operationKind": "query",
    "text": "query ShippingLocationRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...ShippingLocationRoute_submission\n    ...SubmissionRoute_submission\n    id\n  }\n  me {\n    ...ShippingLocationRoute_me\n    id\n  }\n}\n\nfragment ShippingLocationRoute_me on Me {\n  addressConnection {\n    edges {\n      node {\n        addressLine1\n        addressLine2\n        city\n        country\n        isDefault\n        postalCode\n        region\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingLocationRoute_submission on ConsignmentSubmission {\n  locationCity\n  locationCountry\n  locationCountryCode\n  locationState\n  locationPostalCode\n  locationAddress\n  locationAddress2\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n  state\n  myCollectionArtworkID\n}\n"
  }
};
})();

(node as any).hash = "fa2b81b1533c08cae3ad5da58fe1d5b2";

export default node;
