/**
 * @generated SignedSource<<9b0fa547275f0d8d5b434522b7b8cfa6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DeliveryForm_me$data = {
  readonly addressConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly addressLine1: string;
        readonly addressLine2: string | null | undefined;
        readonly city: string;
        readonly country: string;
        readonly internalID: string;
        readonly name: string | null | undefined;
        readonly phoneNumber: string | null | undefined;
        readonly phoneNumberCountryCode: string | null | undefined;
        readonly postalCode: string | null | undefined;
        readonly region: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2DeliveryForm_me";
};
export type Order2DeliveryForm_me$key = {
  readonly " $data"?: Order2DeliveryForm_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DeliveryForm_me",
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
                  "name": "internalID",
                  "storageKey": null
                },
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
                  "name": "region",
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
                  "name": "country",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "phoneNumber",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "phoneNumberCountryCode",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "aa5a2b09cb3abcf2f96804593a074079";

export default node;
