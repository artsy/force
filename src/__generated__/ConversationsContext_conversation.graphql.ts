/**
 * @generated SignedSource<<e2bd649619091281813fc1f9ab4dd01f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationsContext_conversation$data = {
  readonly collectorPartnerOffersConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artworkId: string | null | undefined;
        readonly endAt: string | null | undefined;
        readonly internalID: string;
        readonly isAvailable: boolean | null | undefined;
        readonly isPurchased: boolean;
        readonly note: string | null | undefined;
        readonly priceWithDiscount: {
          readonly display: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ConversationsContext_conversation";
};
export type ConversationsContext_conversation$key = {
  readonly " $data"?: ConversationsContext_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationsContext_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationsContext_conversation",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "offerType",
          "value": [
            "BULK",
            "PERSONALIZED"
          ]
        }
      ],
      "concreteType": "PartnerOfferToCollectorConnection",
      "kind": "LinkedField",
      "name": "collectorPartnerOffersConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PartnerOfferToCollectorEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerOfferToCollector",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "artworkId",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isAvailable",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isPurchased",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "note",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Money",
                  "kind": "LinkedField",
                  "name": "priceWithDiscount",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "display",
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
      "storageKey": "collectorPartnerOffersConnection(first:10,offerType:[\"BULK\",\"PERSONALIZED\"])"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "478748a00e469fe8e2f8495a88f2304f";

export default node;
