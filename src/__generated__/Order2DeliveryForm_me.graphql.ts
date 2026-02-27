/**
 * @generated SignedSource<<b8b2d9ac1a050aa2972034f336802c13>>
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
        readonly isDefault: boolean;
        readonly name: string | null | undefined;
        readonly phoneNumber: string | null | undefined;
        readonly phoneNumberCountryCode: string | null | undefined;
        readonly phoneNumberParsed: {
          readonly display: string | null | undefined;
          readonly isValid: boolean | null | undefined;
        } | null | undefined;
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
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
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
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PhoneNumberType",
                  "kind": "LinkedField",
                  "name": "phoneNumberParsed",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "INTERNATIONAL"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "display",
                      "storageKey": "display(format:\"INTERNATIONAL\")"
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isValid",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isDefault",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "addressConnection(first:20)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "77578b6728542cf7bdb8611c0130e8cd";

export default node;
