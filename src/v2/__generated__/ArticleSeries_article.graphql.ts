/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSeries_article = {
    readonly title: string | null;
    readonly byline: string | null;
    readonly href: string | null;
    readonly series: {
        readonly description: string | null;
    } | null;
    readonly sponsor: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleSponsor_sponsor">;
    } | null;
    readonly relatedArticles: ReadonlyArray<{
        readonly internalID: string;
        readonly href: string | null;
        readonly title: string | null;
        readonly thumbnailTitle: string | null;
        readonly byline: string | null;
        readonly description: string | null;
        readonly publishedAt: string | null;
        readonly thumbnailImage: {
            readonly display: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    }>;
    readonly " $refType": "ArticleSeries_article";
};
export type ArticleSeries_article$data = ArticleSeries_article;
export type ArticleSeries_article$key = {
    readonly " $data"?: ArticleSeries_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSeries_article">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSeries_article",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleSeries",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleSponsor",
      "kind": "LinkedField",
      "name": "sponsor",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSponsor_sponsor"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "relatedArticles",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        (v2/*: any*/),
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "thumbnailTitle",
          "storageKey": null
        },
        (v1/*: any*/),
        (v3/*: any*/),
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();
(node as any).hash = '54fd64505017c1fdb5a9dbff60a913b9';
export default node;
