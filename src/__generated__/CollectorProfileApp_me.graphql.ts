/**
 * @generated SignedSource<<3311d2983eabd5eea511f8095f2d480f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileApp_me$data = {
  readonly name: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeader_me">;
  readonly " $fragmentType": "CollectorProfileApp_me";
};
export type CollectorProfileApp_me$key = {
  readonly " $data"?: CollectorProfileApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileHeader_me"
    },
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

(node as any).hash = "23a898c1ba97fa7516e353ff7a6054ba";

export default node;
