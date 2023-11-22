/**
 * @generated SignedSource<<3ae85a3dab09fb8bc548545602091dab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsIndex_featuredShows$data = {
  readonly items: ReadonlyArray<{
    readonly id?: string;
    readonly " $fragmentSpreads": FragmentRefs<"ShowsFeaturedShow_show">;
  } | null | undefined> | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ShowsIndex_featuredShows";
};
export type ShowsIndex_featuredShows$key = {
  readonly " $data"?: ShowsIndex_featuredShows$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsIndex_featuredShows">;
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

(node as any).hash = "732d89afb9904dae58a96930d2ce1672";

export default node;
