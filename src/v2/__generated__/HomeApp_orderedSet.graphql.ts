/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeApp_orderedSet = {
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedEventsRail_orderedSet">;
    readonly " $refType": "HomeApp_orderedSet";
};
export type HomeApp_orderedSet$data = HomeApp_orderedSet;
export type HomeApp_orderedSet$key = {
    readonly " $data"?: HomeApp_orderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeApp_orderedSet">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeApp_orderedSet",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HomeFeaturedEventsRail_orderedSet"
    }
  ],
  "type": "OrderedSet"
};
(node as any).hash = 'f11ea8c99b658c32463730fa54b8b73c';
export default node;
