/**
 * @generated SignedSource<<1945fae9feb934de3fb61a3dd3d6e14e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignRecentlySold_artist$data = {
  readonly name: string | null;
  readonly targetSupply: {
    readonly microfunnel: {
      readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly internalID: string;
            readonly realizedPrice: string | null;
            readonly " $fragmentSpreads": FragmentRefs<"FillwidthItem_artwork" | "ShelfArtwork_artwork">;
          } | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ArtistConsignRecentlySold_artist";
};
export type ArtistConsignRecentlySold_artist$key = {
  readonly " $data"?: ArtistConsignRecentlySold_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignRecentlySold_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignRecentlySold_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistTargetSupply",
      "kind": "LinkedField",
      "name": "targetSupply",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistTargetSupplyMicrofunnel",
          "kind": "LinkedField",
          "name": "microfunnel",
          "plural": false,
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
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "ShelfArtwork_artwork"
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
                          "name": "realizedPrice",
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
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "bd39241ec1b71ab357e0663a4fbbee3b";

export default node;
