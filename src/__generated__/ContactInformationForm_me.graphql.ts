/**
 * @generated SignedSource<<23dc4a0e41f386a46e89dd12fddd02bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContactInformationForm_me$data = {
  readonly email: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly phone: string | null | undefined;
  readonly phoneNumber: {
    readonly regionCode: string | null | undefined;
  } | null | undefined;
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

(node as any).hash = "76f2bdd0debe5cb2800e4eedfc5dbe0e";

export default node;
