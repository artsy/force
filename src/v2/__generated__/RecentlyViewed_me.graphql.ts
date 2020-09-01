/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RecentlyViewed_me = {
    readonly recentlyViewedArtworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly image: {
                    readonly url: string | null;
                    readonly aspectRatio: number;
                } | null;
                readonly imageTitle: string | null;
                readonly title: string | null;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecentlyViewed_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "recentlyViewedArtworksConnection",
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
                  "name": "id",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "image",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": "large"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": "url(version:\"large\")"
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "aspectRatio",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "imageTitle",
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
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Metadata_artwork"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Save_artwork"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Badge_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "recentlyViewedArtworksConnection(first:20)"
    }
  ],
  "type": "Me"
};
(node as any).hash = 'abeef15094294a706fc1c2aaad7c61a2';
export default node;
