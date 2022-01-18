/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignMeta_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly targetSupply: {
        readonly microfunnel: {
            readonly artworksConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly image: {
                            readonly imageURL: string | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistConsignMeta_artist";
};
export type ArtistConsignMeta_artist$data = ArtistConsignMeta_artist;
export type ArtistConsignMeta_artist$key = {
    readonly " $data"?: ArtistConsignMeta_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignMeta_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignMeta_artist",
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
      "kind": "ScalarField",
      "name": "href",
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
                          "alias": null,
                          "args": null,
                          "concreteType": "Image",
                          "kind": "LinkedField",
                          "name": "image",
                          "plural": false,
                          "selections": [
                            {
                              "alias": "imageURL",
                              "args": [
                                {
                                  "kind": "Literal",
                                  "name": "version",
                                  "value": "medium"
                                }
                              ],
                              "kind": "ScalarField",
                              "name": "url",
                              "storageKey": "url(version:\"medium\")"
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
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '70e6df5913a21146421466fe0a7e143d';
export default node;
