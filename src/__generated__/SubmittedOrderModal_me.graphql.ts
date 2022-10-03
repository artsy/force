/**
 * @generated SignedSource<<d51f5f048badd81c58d7899288e03fbe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmittedOrderModal_me$data = {
  readonly orders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly lineItems: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly artwork: {
                readonly slug: string;
              } | null;
            } | null;
          } | null> | null;
        } | null;
        readonly stateExpiresAt: string | null;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "SubmittedOrderModal_me";
};
export type SubmittedOrderModal_me$key = {
  readonly " $data"?: SubmittedOrderModal_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmittedOrderModal_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmittedOrderModal_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "mode",
          "value": "OFFER"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "UPDATED_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "states",
          "value": [
            "SUBMITTED"
          ]
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orders",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOrderEdge",
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "MMM D"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "stateExpiresAt",
                  "storageKey": "stateExpiresAt(format:\"MMM D\")"
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
                                  "name": "slug",
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
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orders(first:1,mode:\"OFFER\",sort:\"UPDATED_AT_DESC\",states:[\"SUBMITTED\"])"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "bfb069a7b920b63045641b628daaf2c8";

export default node;
