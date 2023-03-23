/**
 * @generated SignedSource<<5fdf99768b4a67e915b91e4610b3382e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSavesAndFollowsRoute_me$data = {
  readonly name: string | null;
  readonly " $fragmentType": "CollectorProfileSavesAndFollowsRoute_me";
};
export type CollectorProfileSavesAndFollowsRoute_me$key = {
  readonly " $data"?: CollectorProfileSavesAndFollowsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSavesAndFollowsRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileSavesAndFollowsRoute_me",
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

(node as any).hash = "97c8a50cf95502644e4213758343c691";

export default node;
