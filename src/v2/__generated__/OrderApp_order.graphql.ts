/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderApp_order = {
    readonly mode: CommerceOrderModeEnum | null;
    readonly currencyCode: string;
    readonly itemsTotalCents: number | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly href: string | null;
                    readonly slug: string;
                    readonly is_acquireable: boolean | null;
                    readonly is_offerable: boolean | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "OrderApp_order";
};
export type OrderApp_order$data = OrderApp_order;
export type OrderApp_order$key = {
    readonly " $data"?: OrderApp_order$data;
    readonly " $fragmentRefs": FragmentRefs<"OrderApp_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderApp_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemsTotalCents",
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
                      "name": "href",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "slug",
                      "storageKey": null
                    },
                    {
                      "alias": "is_acquireable",
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isAcquireable",
                      "storageKey": null
                    },
                    {
                      "alias": "is_offerable",
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isOfferable",
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
(node as any).hash = '44860aea11d75dca20feda64a964481d';
export default node;
