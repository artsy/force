/**
 * @generated SignedSource<<821f57786d966d771eff44234d339952>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileFollowsRoute_me$data = {
  readonly name: string | null | undefined;
  readonly " $fragmentType": "CollectorProfileFollowsRoute_me";
};
export type CollectorProfileFollowsRoute_me$key = {
  readonly " $data"?: CollectorProfileFollowsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileFollowsRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileFollowsRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "900af5b9a4f1e6891ec3f7addaad302b";

export default node;
