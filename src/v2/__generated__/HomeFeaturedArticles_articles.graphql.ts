/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedArticles_articles = ReadonlyArray<{
    readonly internalID: string;
    readonly href: string | null;
    readonly title: string | null;
    readonly publishedAt: string | null;
    readonly thumbnailImage: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "HomeFeaturedArticles_articles";
}>;
export type HomeFeaturedArticles_articles$data = HomeFeaturedArticles_articles;
export type HomeFeaturedArticles_articles$key = ReadonlyArray<{
    readonly " $data"?: HomeFeaturedArticles_articles$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedArticles_articles">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "HomeFeaturedArticles_articles",
  "selections": [
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
      "name": "href",
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
          "name": "format",
          "value": "MMM D YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMM D YYYY\")"
    },
    {
      "alias": null,
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
              "name": "height",
              "value": 244
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 325
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:244,width:325)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article"
};
(node as any).hash = '7e0c47cdf84ffed696b39dfe5c18cd95';
export default node;
