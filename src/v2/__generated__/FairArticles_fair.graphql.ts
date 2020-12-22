/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairArticles_fair = {
    readonly articlesConnection: {
        readonly articles: ReadonlyArray<{
            readonly article: {
                readonly internalID: string;
                readonly title: string | null;
                readonly href: string | null;
                readonly author: {
                    readonly name: string | null;
                } | null;
                readonly publishedAt: string | null;
                readonly thumbnailTitle: string | null;
                readonly thumbnailImage: {
                    readonly large: {
                        readonly width: number;
                        readonly height: number;
                        readonly src: string;
                        readonly srcSet: string;
                    } | null;
                    readonly medium: {
                        readonly width: number;
                        readonly height: number;
                        readonly src: string;
                        readonly srcSet: string;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairArticles_fair";
};
export type FairArticles_fair$data = FairArticles_fair;
export type FairArticles_fair$key = {
    readonly " $data"?: FairArticles_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairArticles_fair">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairArticles_fair",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
      "plural": false,
      "selections": [
        {
          "alias": "articles",
          "args": null,
          "concreteType": "ArticleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": "article",
              "args": null,
              "concreteType": "Article",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                          "value": 546
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 546
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": "cropped(height:546,width:546)"
                    },
                    {
                      "alias": "medium",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 270
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 360
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": "cropped(height:270,width:360)"
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
      "storageKey": "articlesConnection(first:10)"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '76fdd578bfca0274f7878441721cba44';
export default node;
