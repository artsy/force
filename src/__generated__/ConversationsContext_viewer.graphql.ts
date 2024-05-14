/**
 * @generated SignedSource<<b5a6b059e308b5dd07704d510f4d786d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationsContext_viewer$data = {
  readonly me: {
    readonly partnerOffersConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artworkId: string | null | undefined;
          readonly endAt: string | null | undefined;
          readonly internalID: string;
          readonly isAvailable: boolean | null | undefined;
          readonly note: string | null | undefined;
          readonly priceWithDiscount: {
            readonly display: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ConversationsContext_viewer";
};
export type ConversationsContext_viewer$key = {
  readonly " $data"?: ConversationsContext_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationsContext_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationsContext_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Me",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 100
            }
          ],
          "concreteType": "PartnerOfferToCollectorConnection",
          "kind": "LinkedField",
          "name": "partnerOffersConnection",
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
          "storageKey": "partnerOffersConnection(first:100)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "5bdddd04d3159d6b16ce2807b96d0637";

export default node;
