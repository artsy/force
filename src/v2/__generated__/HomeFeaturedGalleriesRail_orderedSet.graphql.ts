/**
 * @generated SignedSource<<a8f3407bd214e20d38e3402ef9864922>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedGalleriesRail_orderedSet$data = {
  readonly orderedItemsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Profile";
        readonly owner: {
          readonly " $fragmentSpreads": FragmentRefs<"PartnerCell_partner">;
        };
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      } | null;
    } | null> | null;
  };
  readonly " $fragmentType": "HomeFeaturedGalleriesRail_orderedSet";
};
export type HomeFeaturedGalleriesRail_orderedSet$key = {
  readonly " $data"?: HomeFeaturedGalleriesRail_orderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedGalleriesRail_orderedSet">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedGalleriesRail_orderedSet",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "OrderedSetItemConnection",
      "kind": "LinkedField",
      "name": "orderedItemsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "OrderedSetItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                      "concreteType": null,
                      "kind": "LinkedField",
                      "name": "owner",
                      "plural": false,
                      "selections": [
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "PartnerCell_partner"
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "type": "Profile",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderedItemsConnection(first:20)"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};

(node as any).hash = "c1d656d65f824f2ce8b585cecd25cd2c";

export default node;
