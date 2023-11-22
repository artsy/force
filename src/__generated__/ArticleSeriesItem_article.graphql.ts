/**
 * @generated SignedSource<<acc7884e130cd035fd551ad8d43fcd20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSeriesItem_article$data = {
  readonly byline: string | null | undefined;
  readonly description: string | null | undefined;
  readonly href: string | null | undefined;
  readonly media: {
    readonly duration: string | null | undefined;
  } | null | undefined;
  readonly publishedAt: string | null | undefined;
  readonly seriesArticle: {
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly thumbnailImage: {
    readonly display: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly thumbnailTitle: string | null | undefined;
  readonly title: string | null | undefined;
  readonly vertical: string | null | undefined;
  readonly " $fragmentType": "ArticleSeriesItem_article";
};
export type ArticleSeriesItem_article$key = {
  readonly " $data"?: ArticleSeriesItem_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSeriesItem_article">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSeriesItem_article",
  "selections": [
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
      "name": "vertical",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "byline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM DD, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMM DD, YYYY\")"
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
          "alias": "display",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 580
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 869
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
          "storageKey": "cropped(height:580,width:869)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleMedia",
      "kind": "LinkedField",
      "name": "media",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "duration",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "seriesArticle",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "16a4037c1b10f7ead04149b6cf7233cc";

export default node;
