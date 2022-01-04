/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSummaryItem_order = {
    readonly sellerDetails: {
        readonly name?: string | null;
    } | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly artistNames: string | null;
                    readonly title: string | null;
                    readonly date: string | null;
                    readonly shippingOrigin: string | null;
                    readonly image: {
                        readonly resized_ArtworkSummaryItem: {
                            readonly url: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtworkSummaryItem_order";
};
export type ArtworkSummaryItem_order$data = ArtworkSummaryItem_order;
export type ArtworkSummaryItem_order$key = {
    readonly " $data"?: ArtworkSummaryItem_order$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSummaryItem_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSummaryItem_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "sellerDetails",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "type": "Partner"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "artistNames",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "title",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "date",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "shippingOrigin",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Image",
                      "kind": "LinkedField",
                      "name": "image",
                      "plural": false,
                      "selections": [
                        {
                          "alias": "resized_ArtworkSummaryItem",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 55
                            }
                          ],
                          "concreteType": "ResizedImageUrl",
                          "kind": "LinkedField",
                          "name": "resized",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "url",
                              "storageKey": null
                            }
                          ],
                          "storageKey": "resized(width:55)"
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrder"
};
(node as any).hash = '56cd6a501085da43b77b96d899f715e1';
export default node;
