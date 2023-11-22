/**
 * @generated SignedSource<<d0cfd5f799434074ea68b6a2ff505152>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollectionCaption_figure$data = {
  readonly __typename: string;
  readonly artist?: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly caption?: string | null | undefined;
  readonly date?: string | null | undefined;
  readonly partner?: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly title?: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
  readonly " $fragmentType": "ArticleSectionImageCollectionCaption_figure";
};
export type ArticleSectionImageCollectionCaption_figure$key = {
  readonly " $data"?: ArticleSectionImageCollectionCaption_figure$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionImageCollectionCaption_figure">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
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
          "kind": "ScalarField",
          "name": "date",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleUnpublishedArtworkArtist",
          "kind": "LinkedField",
          "name": "artist",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleUnpublishedArtworkPartner",
          "kind": "LinkedField",
          "name": "partner",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "type": "ArticleUnpublishedArtwork",
      "abstractKey": null
    }
  ],
  "type": "ArticleSectionImageCollectionFigure",
  "abstractKey": "__isArticleSectionImageCollectionFigure"
};
})();

(node as any).hash = "69dca86fbddcfacf903b09514bf640fc";

export default node;
