/**
 * @generated SignedSource<<27183ccfb6813aad1bff5c360d099822>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_featuredEventsOrderedSet$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedEventsRail_orderedSet">;
  readonly " $fragmentType": "HomeApp_featuredEventsOrderedSet";
};
export type HomeApp_featuredEventsOrderedSet$key = {
  readonly " $data"?: HomeApp_featuredEventsOrderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeApp_featuredEventsOrderedSet",
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

(node as any).hash = "e5316349296555e9aaf1e6896746cc3f";

export default node;
