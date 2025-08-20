/**
 * @generated SignedSource<<39589be85de5220cbdd4e1801b734e71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollectionImage_figure$data = {
  readonly caption?: string | null | undefined;
  readonly formattedMetadata?: string | null | undefined;
  readonly id?: string;
  readonly image?: {
    readonly height: number | null | undefined;
    readonly url: string | null | undefined;
    readonly width: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArticleSectionImageCollectionImage_figure";
};
export type ArticleSectionImageCollectionImage_figure$key = {
  readonly " $data"?: ArticleSectionImageCollectionImage_figure$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionImageCollectionImage_figure">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "main",
            "normalized",
            "larger",
            "large"
          ]
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
    },
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
    }
  ],
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionImageCollectionImage_figure",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v2/*: any*/),
      "type": "ArticleImageSection",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formattedMetadata",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "type": "Artwork",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v2/*: any*/),
      "type": "ArticleUnpublishedArtwork",
      "abstractKey": null
    }
  ],
  "type": "ArticleSectionImageCollectionFigure",
  "abstractKey": "__isArticleSectionImageCollectionFigure"
};
})();

(node as any).hash = "3fb8c4dd6a2407b6e0266ad809ee890e";

export default node;
