/**
 * @generated SignedSource<<0093b6d8663dec57013c51e7d59ca46d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SoldRecently_targetSupply$data = {
  readonly microfunnel: ReadonlyArray<{
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly realizedPrice: string | null;
          readonly realizedToEstimate: string | null;
          readonly " $fragmentSpreads": FragmentRefs<"FillwidthItem_artwork">;
        } | null;
      } | null> | null;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "SoldRecently_targetSupply";
};
export type SoldRecently_targetSupply$key = {
  readonly " $data"?: SoldRecently_targetSupply$data;
  readonly " $fragmentSpreads": FragmentRefs<"SoldRecently_targetSupply">;
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
          "args": null,
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FillwidthItem_artwork"
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "realizedPrice",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "realizedToEstimate",
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
  "type": "TargetSupply",
  "abstractKey": null
};

(node as any).hash = "4f4f9bb3ce9930f44af7ff5436942d46";

export default node;
