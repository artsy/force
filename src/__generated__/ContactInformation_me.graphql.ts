/**
 * @generated SignedSource<<65cc2de1d26331c7e4efdb27080e16c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_me$data = {
  readonly internalID: string;
  readonly name: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly phoneNumber: {
    readonly isValid: boolean | null;
    readonly international: string | null;
    readonly national: string | null;
    readonly regionCode: string | null;
  } | null;
  readonly " $fragmentType": "ContactInformation_me";
};
export type ContactInformation_me$key = {
  readonly " $data"?: ContactInformation_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContactInformation_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContactInformation_me",
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "e3dfd41ee7d8032f781ffae215835e69";

export default node;
