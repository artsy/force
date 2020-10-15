/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsArticles_artwork = {
    readonly articles: ReadonlyArray<{
        readonly author: {
            readonly name: string | null;
        } | null;
        readonly href: string | null;
        readonly published_at: string | null;
        readonly thumbnail_image: {
            readonly resized: {
                readonly url: string;
            } | null;
        } | null;
        readonly thumbnail_title: string | null;
    } | null> | null;
    readonly " $refType": "ArtworkDetailsArticles_artwork";
};
export type ArtworkDetailsArticles_artwork$data = ArtworkDetailsArticles_artwork;
export type ArtworkDetailsArticles_artwork$key = {
    readonly " $data"?: ArtworkDetailsArticles_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsArticles_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsArticles_artwork",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10
        }
      ],
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "articles",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Author",
          "kind": "LinkedField",
          "name": "author",
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
          "name": "href",
          "storageKey": null
        },
        {
          "alias": "published_at",
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM Do, YYYY"
            }
          ],
          "kind": "ScalarField",
          "name": "publishedAt",
          "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
        },
        {
          "alias": "thumbnail_image",
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "thumbnailImage",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 300
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(width:300)"
            }
          ],
          "storageKey": null
        },
        {
          "alias": "thumbnail_title",
          "args": null,
          "kind": "ScalarField",
          "name": "thumbnailTitle",
          "storageKey": null
        }
      ],
      "storageKey": "articles(size:10)"
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '07fa06d932146874a0ac580620a5cdf9';
export default node;
