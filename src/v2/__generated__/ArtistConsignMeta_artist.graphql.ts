/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignMeta_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly targetSupply: {
        readonly microfunnel: {
            readonly artworks: ReadonlyArray<{
                readonly artwork: {
                    readonly image: {
                        readonly imageURL: string | null;
                    } | null;
                } | null;
            } | null> | null;
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
  "kind": "Fragment",
  "name": "ArtistConsignMeta_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "targetSupply",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistTargetSupply",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "microfunnel",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistTargetSupplyMicrofunnel",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "artworks",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistTargetSupplyMicrofunnelArtwork",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "image",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": "imageURL",
                          "name": "url",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "version",
                              "value": "medium"
                            }
                          ],
                          "storageKey": "url(version:\"medium\")"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'cdb304af5dff2c7987ce5b9833fa7914';
export default node;
