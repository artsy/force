/**
 * @generated SignedSource<<2297b77896f3a06c57bb22d176bd1d04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BackLink_artist$data = {
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentType": "BackLink_artist";
};
export type BackLink_artist$key = {
  readonly " $data"?: BackLink_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"BackLink_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BackLink_artist",
  "selections": [
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "a9a4e82d12d50d523e4e200d3e853a48";

export default node;
