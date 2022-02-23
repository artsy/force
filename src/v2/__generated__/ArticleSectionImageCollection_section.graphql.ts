/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollectionLayout = "COLUMN_WIDTH" | "FILLWIDTH" | "OVERFLOW_FILLWIDTH" | "%future added value";
export type ArticleSectionImageCollection_section = {
    readonly layout: ArticleSectionImageCollectionLayout;
    readonly figures: ReadonlyArray<{
        readonly __typename: string;
        readonly " $fragmentRefs": FragmentRefs<"ArticleSectionImageCollectionImage_figure" | "ArticleSectionImageCollectionCaption_figure">;
    }>;
    readonly " $refType": "ArticleSectionImageCollection_section";
};
export type ArticleSectionImageCollection_section$data = ArticleSectionImageCollection_section;
export type ArticleSectionImageCollection_section$key = {
    readonly " $data"?: ArticleSectionImageCollection_section$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSectionImageCollection_section">;
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
(node as any).hash = '4a4e89774caeaecfcc5d9993cf6121a4';
export default node;
