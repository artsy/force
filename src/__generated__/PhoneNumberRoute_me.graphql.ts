/**
 * @generated SignedSource<<2fa9669990e89095e8beb7635124a820>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PhoneNumberRoute_me$data = {
  readonly internalID: string;
  readonly phoneNumber: {
    readonly display: string | null | undefined;
    readonly regionCode: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PhoneNumberRoute_me";
};
export type PhoneNumberRoute_me$key = {
  readonly " $data"?: PhoneNumberRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"PhoneNumberRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PhoneNumberRoute_me",
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
      "concreteType": "PhoneNumberType",
      "kind": "LinkedField",
      "name": "phoneNumber",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "regionCode",
          "storageKey": null
        },
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "d1b998f0c518b35a539bead3a6c6aaeb";

export default node;
