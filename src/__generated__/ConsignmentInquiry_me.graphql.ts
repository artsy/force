/**
 * @generated SignedSource<<b547276cf35e887b9eecd7dfbe1e47c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentInquiry_me$data = {
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
  readonly " $fragmentType": "ConsignmentInquiry_me";
};
export type ConsignmentInquiry_me$key = {
  readonly " $data"?: ConsignmentInquiry_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConsignmentInquiry_me",
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

(node as any).hash = "489c6aa9c723d54468f451f4896c21f2";

export default node;
