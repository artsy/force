/**
 * @generated SignedSource<<678ea83b2339af487598627523e1c42b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsShippingAddresses_me$data = {
  readonly addresses: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"SettingsShippingAddress_address">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "SettingsShippingAddresses_me";
};
export type SettingsShippingAddresses_me$key = {
  readonly " $data"?: SettingsShippingAddresses_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsShippingAddresses_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsShippingAddresses_me",
  "selections": [
    {
      "alias": "addresses",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SettingsShippingAddress_address"
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

(node as any).hash = "010b9848f693b9ad360dabfdeb79f158";

export default node;
