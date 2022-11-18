/**
 * @generated SignedSource<<785644f4f2b0c7e94d276ced4140e9b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FlashBanner_me$data = {
  readonly canRequestEmailConfirmation: boolean;
  readonly " $fragmentType": "FlashBanner_me";
};
export type FlashBanner_me$key = {
  readonly " $data"?: FlashBanner_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"FlashBanner_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlashBanner_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canRequestEmailConfirmation",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "22d7d766aeec869eb44fe74bb86416a4";

export default node;
