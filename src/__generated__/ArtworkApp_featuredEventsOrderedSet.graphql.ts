/**
 * @generated SignedSource<<33be85412cb7780981dcb6fd6a3602f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_featuredEventsOrderedSet$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedEventsRail_orderedSet">;
  readonly " $fragmentType": "ArtworkApp_featuredEventsOrderedSet";
};
export type ArtworkApp_featuredEventsOrderedSet$key = {
  readonly " $data"?: ArtworkApp_featuredEventsOrderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_featuredEventsOrderedSet">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_featuredEventsOrderedSet",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HomeFeaturedEventsRail_orderedSet"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};

(node as any).hash = "f810d1a8f30bf977fc90fb934ce439b2";

export default node;
