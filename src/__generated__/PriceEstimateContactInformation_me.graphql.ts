/**
 * @generated SignedSource<<1f2f5d1123cd7d56683c54ceebf2945e>>
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
