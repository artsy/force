/**
 * @generated SignedSource<<184a9942a5ecf063a76be89729d18cad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActions_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_me">;
  readonly " $fragmentType": "ArtworkActions_me";
};
export type ArtworkActions_me$key = {
  readonly " $data"?: ArtworkActions_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActions_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActions_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActionsSaveButton_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "3f79445ead535b7c252d33e0565bdb1f";

export default node;
