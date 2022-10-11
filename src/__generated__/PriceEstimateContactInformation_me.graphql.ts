/**
 * @generated SignedSource<<4a1e38d529457e397830ebbc7b0a6a2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceEstimateContactInformation_me$data = {
  readonly email: string | null;
  readonly internalID: string;
  readonly name: string | null;
  readonly phone: string | null;
  readonly phoneNumber: {
    readonly international: string | null;
    readonly isValid: boolean | null;
    readonly national: string | null;
    readonly regionCode: string | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ContactInformationForm_me">;
  readonly " $fragmentType": "PriceEstimateContactInformation_me";
};
export type PriceEstimateContactInformation_me$key = {
  readonly " $data"?: PriceEstimateContactInformation_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceEstimateContactInformation_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceEstimateContactInformation_me",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
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
          "name": "isValid",
          "storageKey": null
        },
        {
          "alias": "international",
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
          "alias": "national",
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
          "name": "regionCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContactInformationForm_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "90da4cd8958e595fe22b17c682793b16";

export default node;
