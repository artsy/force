/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersFeaturedCarousel_viewer = {
    readonly orderedSet: {
        readonly orderedItemsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID?: string;
                    readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarouselCell_profile">;
                } | null;
            } | null> | null;
        };
    } | null;
    readonly " $refType": "PartnersFeaturedCarousel_viewer";
};
export type PartnersFeaturedCarousel_viewer$data = PartnersFeaturedCarousel_viewer;
export type PartnersFeaturedCarousel_viewer$key = {
    readonly " $data"?: PartnersFeaturedCarousel_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id",
      "type": "String!"
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
                      "type": "Profile"
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
  "type": "Viewer"
};
(node as any).hash = '3cde7259fe9f6d1b5010399bf2c6b469';
export default node;
