/**
 * @generated SignedSource<<2a10d753917d562380fdc22eb8465a28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArticleFeatureSectionType = "BASIC" | "FULLSCREEN" | "SPLIT" | "TEXT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleMetaTags_article$data = {
  readonly byline: string | null | undefined;
  readonly description: string | null | undefined;
  readonly hero: {
    readonly image?: {
      readonly split: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly layout?: ArticleFeatureSectionType;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly keywords: ReadonlyArray<string>;
  readonly metaPublishedAt: string | null | undefined;
  readonly searchDescription: string | null | undefined;
  readonly searchTitle: string | null | undefined;
  readonly thumbnailImage: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArticleMetaTags_article";
};
export type ArticleMetaTags_article$key = {
  readonly " $data"?: ArticleMetaTags_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleMetaTags_article">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleMetaTags_article",
  "selections": [
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "keywords",
      "storageKey": null
    },
    {
      "alias": "metaPublishedAt",
      "args": null,
      "kind": "ScalarField",
      "name": "publishedAt",
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
      "name": "searchTitle",
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
      "args": null,
      "kind": "ScalarField",
      "name": "searchDescription",
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
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "hero",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "layout",
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
                (v0/*: any*/),
                {
                  "alias": "split",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 900
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
                  "storageKey": "resized(width:900)"
                }
              ],
              "storageKey": null
            }
          ],
          "type": "ArticleFeatureSection",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "20c1431e8e724312e2fe66bdb9a8b0d4";

export default node;
