/**
 * @generated SignedSource<<563c58ef15b9e2fbd3099e37b1e2e66f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeaturedFairs_fairs$data = ReadonlyArray<{
  readonly internalID: string;
  readonly name: string | null;
  readonly href: string | null;
  readonly " $fragmentType": "FeaturedFairs_fairs";
}>;
export type FeaturedFairs_fairs$key = ReadonlyArray<{
  readonly " $data"?: FeaturedFairs_fairs$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeaturedFairs_fairs">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "FeaturedFairs_fairs",
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
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "52dfbf0cf61e285fd9a85c6015098cd0";

export default node;
