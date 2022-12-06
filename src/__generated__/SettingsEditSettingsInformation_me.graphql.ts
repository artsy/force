/**
 * @generated SignedSource<<8dfeed1b299657d9175de4634adc9a31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsInformation_me$data = {
  readonly email: string | null;
  readonly paddleNumber: string | null;
  readonly phone: string | null;
  readonly priceRange: string | null;
  readonly priceRangeMax: number | null;
  readonly priceRangeMin: number | null;
  readonly " $fragmentType": "SettingsEditSettingsInformation_me";
};
export type SettingsEditSettingsInformation_me$key = {
  readonly " $data"?: SettingsEditSettingsInformation_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsInformation_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsInformation_me",
  "selections": [
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
      "name": "paddleNumber",
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
      "kind": "ScalarField",
      "name": "priceRange",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceRangeMin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceRangeMax",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "ca1583e8b5be5ddeb9a3f5d0a8d18257";

export default node;
