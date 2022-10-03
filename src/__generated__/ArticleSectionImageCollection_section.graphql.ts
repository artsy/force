/**
 * @generated SignedSource<<4040f2f0b958c35ca90a4b6e3e476b50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArticleSectionImageCollectionLayout = "COLUMN_WIDTH" | "FILLWIDTH" | "OVERFLOW_FILLWIDTH" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollection_section$data = {
  readonly figures: ReadonlyArray<{
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionImageCollectionCaption_figure" | "ArticleSectionImageCollectionImage_figure">;
  }>;
  readonly layout: ArticleSectionImageCollectionLayout;
  readonly " $fragmentType": "ArticleSectionImageCollection_section";
};
export type ArticleSectionImageCollection_section$key = {
  readonly " $data"?: ArticleSectionImageCollection_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionImageCollection_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionImageCollection_section",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "figures",
      "plural": true,
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
          "name": "ArticleSectionImageCollectionImage_figure"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArticleSectionImageCollectionCaption_figure"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionImageCollection",
  "abstractKey": null
};

(node as any).hash = "4a4e89774caeaecfcc5d9993cf6121a4";

export default node;
