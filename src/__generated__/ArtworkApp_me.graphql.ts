/**
 * @generated SignedSource<<5c4d51860de5ce52566bd3b5b7084e94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowser_me" | "ArtworkSidebar2_me" | "ArtworkSidebar_me" | "SubmittedOrderModal_me">;
  readonly " $fragmentType": "ArtworkApp_me";
};
export type ArtworkApp_me$key = {
  readonly " $data"?: ArtworkApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmittedOrderModal_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "51922f15dab1efe5a99b9a37e07c4575";

export default node;
