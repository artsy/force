/**
 * @generated SignedSource<<0e1c5aeb625c1e9c733d399d59cffd07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGallery_article$data = {
  readonly sections: ReadonlyArray<{
    readonly __typename: "ArticleSectionImageCollection";
    readonly figures: ReadonlyArray<{
      readonly __typename: string;
      readonly id?: string;
      readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGalleryCaption_figure" | "ArticleZoomGalleryFigure_figure">;
    }>;
  } | {
    readonly __typename: "ArticleSectionImageSet";
    readonly figures: ReadonlyArray<{
      readonly __typename: string;
      readonly id?: string;
      readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGalleryCaption_figure" | "ArticleZoomGalleryFigure_figure">;
    }>;
    readonly title: string | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly " $fragmentType": "ArticleZoomGallery_article";
};
export type ArticleZoomGallery_article$key = {
  readonly " $data"?: ArticleZoomGallery_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGallery_article">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ArticleZoomGalleryFigure_figure"
},
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ArticleZoomGalleryCaption_figure"
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v4 = {
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "Artwork",
  "abstractKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "ArticleImageSection",
  "abstractKey": null
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
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "figures",
              "plural": true,
              "selections": [
                (v1/*: any*/),
                (v2/*: any*/),
                (v0/*: any*/),
                (v4/*: any*/),
                (v5/*: any*/),
                {
                  "kind": "InlineFragment",
                  "selections": (v3/*: any*/),
                  "type": "ArticleUnpublishedArtwork",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            }
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
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "figures",
              "plural": true,
              "selections": [
                (v1/*: any*/),
                (v2/*: any*/),
                (v0/*: any*/),
                (v4/*: any*/),
                (v5/*: any*/)
              ],
              "storageKey": null
            }
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

(node as any).hash = "10f3e86aee0c73695b2beac505b64ddb";

export default node;
