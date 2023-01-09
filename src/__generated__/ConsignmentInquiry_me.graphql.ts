/**
 * @generated SignedSource<<158335e709504e8cf2da063672c49dcf>>
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

(node as any).hash = "501aa3a979056a6f6e9320bc97eda07f";

export default node;
