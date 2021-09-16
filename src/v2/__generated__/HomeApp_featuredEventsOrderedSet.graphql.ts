/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeApp_featuredEventsOrderedSet = {
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedEventsRail_orderedSet">;
    readonly " $refType": "HomeApp_featuredEventsOrderedSet";
};
export type HomeApp_featuredEventsOrderedSet$data = HomeApp_featuredEventsOrderedSet;
export type HomeApp_featuredEventsOrderedSet$key = {
    readonly " $data"?: HomeApp_featuredEventsOrderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
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
  "type": "OrderedSet"
};
(node as any).hash = 'e5316349296555e9aaf1e6896746cc3f';
export default node;
