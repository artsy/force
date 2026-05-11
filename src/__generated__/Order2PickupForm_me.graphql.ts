/**
 * @generated SignedSource<<4f54ee24e4ca4f1cccd6800635265e2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PickupForm_me$data = {
  readonly phoneNumber: {
    readonly display: string | null | undefined;
    readonly originalNumber: string | null | undefined;
    readonly regionCode: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2PickupForm_me";
};
export type Order2PickupForm_me$key = {
  readonly " $data"?: Order2PickupForm_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PickupForm_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PickupForm_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PhoneNumberType",
      "kind": "LinkedField",
      "name": "phoneNumber",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "NATIONAL"
            }
          ],
          "kind": "ScalarField",
          "name": "display",
          "storageKey": "display(format:\"NATIONAL\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "originalNumber",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "regionCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "9279de0a58732e6002deb1eed411952e";

export default node;
