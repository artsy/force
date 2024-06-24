/**
 * @generated SignedSource<<72d59a8e64e09a8e879e5ad83431108d>>
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
    readonly countryCode: string | null | undefined;
    readonly display: string | null | undefined;
    readonly originalNumber: string | null | undefined;
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
          "name": "countryCode",
          "storageKey": null
        },
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "originalNumber",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "deae648d676fca16933a442da212a2f8";

export default node;
