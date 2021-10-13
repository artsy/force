/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Steve_viewer = {
    readonly standoutLotsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly sale: {
                    readonly isClosed: boolean | null;
                    readonly " $fragmentRefs": FragmentRefs<"Steve2_sale">;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "Steve_viewer";
};
export type Steve_viewer$data = Steve_viewer;
export type Steve_viewer$key = {
    readonly " $data"?: Steve_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"Steve_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Steve_viewer",
  "selections": [
    {
      "alias": "standoutLotsConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        },
        {
          "kind": "Literal",
          "name": "geneIDs",
          "value": "highlights-at-auction"
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "kind": "LinkedField",
      "name": "saleArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtwork",
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
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Sale",
                  "kind": "LinkedField",
                  "name": "sale",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isClosed",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "Steve2_sale"
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
      "storageKey": "saleArtworksConnection(first:5,geneIDs:\"highlights-at-auction\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'a455a3a851aaeaf9ae6bc386665377ed';
export default node;
