/**
 * @generated SignedSource<<d600ad56c9eb8264387a9620781c0c73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShowsRail_orderedSet$data = {
  readonly items: ReadonlyArray<{
    readonly __typename: "Show";
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedShow_show">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "HomeFeaturedShowsRail_orderedSet";
};
export type HomeFeaturedShowsRail_orderedSet$key = {
  readonly " $data"?: HomeFeaturedShowsRail_orderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedShowsRail_orderedSet">;
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "HomeFeaturedShow_show"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
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

(node as any).hash = "5ef730765b6c545c273eaf8050805480";

export default node;
