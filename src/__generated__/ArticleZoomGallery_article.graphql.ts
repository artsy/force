/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGallery_article = {
    readonly sections: ReadonlyArray<{
        readonly __typename: "ArticleSectionImageCollection";
        readonly figures: ReadonlyArray<{
            readonly __typename: string;
            readonly id?: string | undefined;
            readonly " $fragmentRefs": FragmentRefs<"ArticleZoomGalleryFigure_figure" | "ArticleZoomGalleryCaption_figure">;
        }>;
    } | {
        readonly __typename: "ArticleSectionImageSet";
        readonly title: string | null;
        readonly figures: ReadonlyArray<{
            readonly __typename: string;
            readonly id?: string | undefined;
            readonly " $fragmentRefs": FragmentRefs<"ArticleZoomGalleryFigure_figure" | "ArticleZoomGalleryCaption_figure">;
        }>;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }>;
    readonly " $refType": "ArticleZoomGallery_article";
};
export type ArticleZoomGallery_article$data = ArticleZoomGallery_article;
export type ArticleZoomGallery_article$key = {
    readonly " $data"?: ArticleZoomGallery_article$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArticleZoomGallery_article">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "figures",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleZoomGalleryFigure_figure"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleZoomGalleryCaption_figure"
    },
    {
      "kind": "InlineFragment",
      "selections": (v1/*: any*/),
      "type": "Artwork",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v1/*: any*/),
      "type": "ArticleImageSection",
      "abstractKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleZoomGallery_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "sections",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            (v2/*: any*/)
          ],
          "type": "ArticleSectionImageCollection",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            (v2/*: any*/)
          ],
          "type": "ArticleSectionImageSet",
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
(node as any).hash = '718ade481e06a3457816550a1f14c849';
export default node;
