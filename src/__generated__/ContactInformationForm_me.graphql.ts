/**
 * @generated SignedSource<<aee5950d1e264161cd6fdfaaf262aeb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContactInformationForm_me$data = {
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
  readonly " $fragmentType": "ContactInformationForm_me";
};
export type ContactInformationForm_me$key = {
  readonly " $data"?: ContactInformationForm_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContactInformationForm_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContactInformationForm_me",
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

(node as any).hash = "2ac336f0b1701e881328bae0038e630d";

export default node;
