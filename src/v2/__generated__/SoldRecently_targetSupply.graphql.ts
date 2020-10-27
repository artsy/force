/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SoldRecently_targetSupply = {
    readonly microfunnel: ReadonlyArray<{
        readonly artworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly realizedPrice: string | null;
                    readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
                } | null;
            } | null> | null;
        } | null;
    } | null> | null;
    readonly " $refType": "SoldRecently_targetSupply";
};
export type SoldRecently_targetSupply$data = SoldRecently_targetSupply;
export type SoldRecently_targetSupply$key = {
    readonly " $data"?: SoldRecently_targetSupply$data;
    readonly " $fragmentRefs": FragmentRefs<"SoldRecently_targetSupply">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SoldRecently_targetSupply",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "TargetSupplyMicrofunnelItem",
      "kind": "LinkedField",
      "name": "microfunnel",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1
            }
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtworkEdge",
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
                      "kind": "ScalarField",
                      "name": "realizedPrice",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FillwidthItem_artwork"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artworksConnection(first:1)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "TargetSupply"
};
(node as any).hash = '078b6c58d241220af9fc51e433ca4fd7';
export default node;
