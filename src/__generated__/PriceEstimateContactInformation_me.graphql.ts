/**
 * @generated SignedSource<<299cd73981b8fdfbfd0feacb3e9c1a2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceEstimateContactInformation_me$data = {
  readonly email: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly phone: string | null | undefined;
  readonly phoneNumber: {
    readonly regionCode: string | null | undefined;
  } | null | undefined;
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

(node as any).hash = "8f3a51101701efc951dd37834b1f3cff";

export default node;
