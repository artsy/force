/**
 * @generated SignedSource<<8232064d3623900555dde287b05486e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdditionalArtworkDetails_order$data = {
  readonly artworkDetails: string | null | undefined;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artworkVersion: {
          readonly condition_description: string | null | undefined;
          readonly provenance: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "AdditionalArtworkDetails_order";
};
export type AdditionalArtworkDetails_order$key = {
  readonly " $data"?: AdditionalArtworkDetails_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdditionalArtworkDetails_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdditionalArtworkDetails_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworkDetails",
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
                  "concreteType": "ArtworkVersion",
                  "kind": "LinkedField",
                  "name": "artworkVersion",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "provenance",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "condition_description",
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
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "20c522832104714f2a23f5618720eded";

export default node;
