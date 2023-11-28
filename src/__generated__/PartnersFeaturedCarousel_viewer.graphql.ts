/**
 * @generated SignedSource<<f13b02c0f302379d190c76b561fab5ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersFeaturedCarousel_viewer$data = {
  readonly orderedSet: {
    readonly orderedItemsConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID?: string;
          readonly " $fragmentSpreads": FragmentRefs<"PartnersFeaturedCarouselCell_profile">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
  readonly " $fragmentType": "PartnersFeaturedCarousel_viewer";
};
export type PartnersFeaturedCarousel_viewer$key = {
  readonly " $data"?: PartnersFeaturedCarousel_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersFeaturedCarousel_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "OrderedSet",
      "kind": "LinkedField",
      "name": "orderedSet",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 50
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
                          "name": "PartnersFeaturedCarouselCell_profile"
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
          "storageKey": "orderedItemsConnection(first:50)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "3cde7259fe9f6d1b5010399bf2c6b469";

export default node;
