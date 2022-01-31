/**
 * @generated SignedSource<<fc05f01598967821977aab24cca7f141>>
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
  } | null> | null;
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

(node as any).hash = "49e04387afd50290a42f4f22b3334727";

export default node;
