/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollectionCaption_figure = {
    readonly __typename: string;
    readonly caption?: string | null | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork">;
    readonly " $refType": "ArticleSectionImageCollectionCaption_figure";
};
export type ArticleSectionImageCollectionCaption_figure$data = ArticleSectionImageCollectionCaption_figure;
export type ArticleSectionImageCollectionCaption_figure$key = {
    readonly " $data"?: ArticleSectionImageCollectionCaption_figure$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSectionImageCollectionCaption_figure">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionImageCollectionCaption_figure",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Metadata_artwork"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
          "storageKey": null
        }
      ],
      "type": "ArticleImageSection",
      "abstractKey": null
    }
  ],
  "type": "ArticleSectionImageCollectionFigure",
  "abstractKey": "__isArticleSectionImageCollectionFigure"
};
(node as any).hash = '446271f2fd3efad0800c1e6260f3fd5b';
export default node;
