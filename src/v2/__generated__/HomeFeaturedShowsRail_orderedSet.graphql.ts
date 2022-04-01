/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShowsRail_orderedSet = {
    readonly items: ReadonlyArray<({
        readonly __typename: "Show";
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShow_show">;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "HomeFeaturedShowsRail_orderedSet";
};
export type HomeFeaturedShowsRail_orderedSet$data = HomeFeaturedShowsRail_orderedSet;
export type HomeFeaturedShowsRail_orderedSet$key = {
    readonly " $data"?: HomeFeaturedShowsRail_orderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShowsRail_orderedSet">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedShowsRail_orderedSet",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "HomeFeaturedShow_show"
            }
          ],
          "type": "Show",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
(node as any).hash = '5ef730765b6c545c273eaf8050805480';
export default node;
