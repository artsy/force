/**
 * @generated SignedSource<<61ccece7e979eb33a02624ba71fe1cb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsMedianSalePrice_me$data = {
  readonly medianSalePrices: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artist: {
          readonly internalID: string;
          readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
        } | null | undefined;
        readonly internalID: string;
        readonly marketPriceInsights: {
          readonly medianSalePriceDisplayText: string | null | undefined;
        } | null | undefined;
        readonly medium: string | null | undefined;
        readonly mediumType: {
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly title: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "InsightsMedianSalePrice_me";
};
export type InsightsMedianSalePrice_me$key = {
  readonly " $data"?: InsightsMedianSalePrice_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"InsightsMedianSalePrice_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InsightsMedianSalePrice_me",
  "selections": [
    {
      "alias": "medianSalePrices",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 3
        },
        {
          "kind": "Literal",
          "name": "sortByLastAuctionResultDate",
          "value": true
        }
      ],
      "concreteType": "MyCollectionConnection",
      "kind": "LinkedField",
      "name": "myCollectionConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MyCollectionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "medium",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ArtworkMedium",
                  "kind": "LinkedField",
                  "name": "mediumType",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    }
                  ],
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "shallow",
                      "value": true
                    }
                  ],
                  "concreteType": "Artist",
                  "kind": "LinkedField",
                  "name": "artist",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "EntityHeaderArtist_artist"
                    }
                  ],
                  "storageKey": "artist(shallow:true)"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ArtworkPriceInsights",
                  "kind": "LinkedField",
                  "name": "marketPriceInsights",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "medianSalePriceDisplayText",
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
      "storageKey": "myCollectionConnection(first:3,sortByLastAuctionResultDate:true)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "d7fa86365d3a548c7e8b06101edd0abb";

export default node;
