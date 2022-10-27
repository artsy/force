/**
 * @generated SignedSource<<1aa09bb60b1602a1c1689a77f5cbff0d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlistedArtworkBanner_partner$data = {
  readonly name: string | null;
  readonly " $fragmentType": "UnlistedArtworkBanner_partner";
};
export type UnlistedArtworkBanner_partner$key = {
  readonly " $data"?: UnlistedArtworkBanner_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlistedArtworkBanner_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlistedArtworkBanner_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "251bfcc9003073fc788463166cc37571";

export default node;
