/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShows_orderedSet = {
    readonly items: ReadonlyArray<({
        readonly __typename: "Show";
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShow_show">;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "HomeFeaturedShows_orderedSet";
};
export type HomeFeaturedShows_orderedSet$data = HomeFeaturedShows_orderedSet;
export type HomeFeaturedShows_orderedSet$key = {
    readonly " $data"?: HomeFeaturedShows_orderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShows_orderedSet">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedShows_orderedSet",
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
          "type": "Show"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet"
};
(node as any).hash = '66447453f7810a7b6676ae408f7cb764';
export default node;
