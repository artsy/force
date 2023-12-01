/**
 * @generated SignedSource<<10bae0cb44d7a2d27db04f0499836888>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedMarketNews_articles$data = ReadonlyArray<{
  readonly byline: string | null | undefined;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly publishedAt: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly thumbnailImage: {
    readonly large: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null | undefined;
  } | null | undefined;
  readonly thumbnailTitle: string | null | undefined;
  readonly title: string | null | undefined;
  readonly vertical: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
  readonly " $fragmentType": "HomeFeaturedMarketNews_articles";
}>;
export type HomeFeaturedMarketNews_articles$key = ReadonlyArray<{
  readonly " $data"?: HomeFeaturedMarketNews_articles$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedMarketNews_articles">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "HomeFeaturedMarketNews_articles",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CellArticle_article"
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "byline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
          "value": "MMM D, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vertical",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnailTitle",
      "storageKey": null
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
          "alias": "large",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 720
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 670
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
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
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
          "storageKey": "cropped(height:720,width:670)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "82d378969890b54e0b2e84237bc130f9";

export default node;
