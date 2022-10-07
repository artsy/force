/**
 * @generated SignedSource<<c65a8f0a010a818001ae94071ae086f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGalleryCaption_figure$data = {
  readonly __typename: "ArticleImageSection";
  readonly caption: string | null;
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
} | {
  readonly __typename: "ArticleUnpublishedArtwork";
  readonly artist: {
    readonly name: string | null;
  } | null;
  readonly date: string | null;
  readonly partner: {
    readonly name: string | null;
  } | null;
  readonly title: string | null;
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
} | {
  readonly __typename: "Artwork";
  readonly href: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
};
export type ArticleZoomGalleryCaption_figure$key = {
  readonly " $data"?: ArticleZoomGalleryCaption_figure$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGalleryCaption_figure">;
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
  "name": "ArticleZoomGalleryCaption_figure",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Metadata_artwork"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "type": "Artwork",
      "abstractKey": null
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

(node as any).hash = "48db763f1f8a0b2f28d82482cd659864";

export default node;
