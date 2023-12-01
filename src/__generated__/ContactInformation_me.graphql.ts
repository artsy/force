/**
 * @generated SignedSource<<ca91c922374e2f3f4f2ed10f06d6b52c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_me$data = {
  readonly email: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly phone: string | null | undefined;
  readonly phoneNumber: {
    readonly regionCode: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ContactInformationForm_me">;
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

(node as any).hash = "f9f59b7af2a2be16a9ce9cd2bc916fa5";

export default node;
