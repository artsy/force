/**
 * @generated SignedSource<<e06f68fb93cbf857058bf3434d588fc3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowser_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActions_me">;
  readonly " $fragmentType": "ArtworkImageBrowser_me";
};
export type ArtworkImageBrowser_me$key = {
  readonly " $data"?: ArtworkImageBrowser_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowser_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowser_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActions_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "6220bf3e67eb9fcf0487d054502ac3a4";

export default node;
