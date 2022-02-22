/**
 * @generated SignedSource<<c5e6269f5c9fc79303a0788bf3b14426>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairTimer_fair$data = {
  readonly endAt: string | null;
  readonly " $fragmentType": "FairTimer_fair";
};
export type FairTimer_fair$key = {
  readonly " $data"?: FairTimer_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairTimer_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairTimer_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "7b2de54fb447d1613f29d8b18074f1ea";

export default node;
