/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsIndex_featuredShows = {
    readonly name: string | null;
    readonly items: ReadonlyArray<{
        readonly id?: string;
        readonly " $fragmentRefs": FragmentRefs<"ShowsFeaturedShow_show">;
    } | null> | null;
    readonly " $refType": "ShowsIndex_featuredShows";
};
export type ShowsIndex_featuredShows$data = ShowsIndex_featuredShows;
export type ShowsIndex_featuredShows$key = {
    readonly " $data"?: ShowsIndex_featuredShows$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowsIndex_featuredShows">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsIndex_featuredShows",
  "selections": [
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ShowsFeaturedShow_show"
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
(node as any).hash = '732d89afb9904dae58a96930d2ce1672';
export default node;
