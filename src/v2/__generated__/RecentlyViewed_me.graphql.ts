/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RecentlyViewed_me = {
    readonly recentlyViewedArtworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly image: {
                    readonly aspect_ratio: number;
                    readonly url: string | null;
                } | null;
                readonly href: string | null;
                readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork" | "Save_artwork" | "Badge_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "RecentlyViewed_me";
};
export type RecentlyViewed_me$data = RecentlyViewed_me;
export type RecentlyViewed_me$key = {
    readonly " $data"?: RecentlyViewed_me$data;
    readonly " $fragmentRefs": FragmentRefs<"RecentlyViewed_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "RecentlyViewed_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "recentlyViewedArtworksConnection",
      "storageKey": "recentlyViewedArtworksConnection(first:20)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
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
                      "alias": "aspect_ratio",
                      "name": "aspectRatio",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "url",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": "large"
                        }
                      ],
                      "storageKey": "url(version:\"large\")"
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "href",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Metadata_artwork",
                  "args": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Save_artwork",
                  "args": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Badge_artwork",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '746769007f334b0c16dc32cb9ec46bf4';
export default node;
