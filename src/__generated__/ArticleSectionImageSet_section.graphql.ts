/**
 * @generated SignedSource<<a625c23641e7384da8ea39e58353a2a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArticleSectionImageSetLayout = "FULL" | "MINI" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageSet_section$data = {
  readonly setLayout: ArticleSectionImageSetLayout;
  readonly title: string | null;
  readonly counts: {
    readonly figures: number;
  };
  readonly cover: {
    readonly __typename: "ArticleImageSection";
    readonly id: string;
    readonly image: {
      readonly small: {
        readonly src: string;
        readonly srcSet: string;
        readonly height: number;
        readonly width: number;
      } | null;
      readonly large: {
        readonly src: string;
        readonly srcSet: string;
        readonly height: number | null;
        readonly width: number | null;
      } | null;
    } | null;
  } | {
    readonly __typename: "Artwork";
    readonly id: string;
    readonly image: {
      readonly small: {
        readonly src: string;
        readonly srcSet: string;
        readonly height: number;
        readonly width: number;
      } | null;
      readonly large: {
        readonly src: string;
        readonly srcSet: string;
        readonly height: number | null;
        readonly width: number | null;
      } | null;
    } | null;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
  readonly " $fragmentType": "ArticleSectionImageSet_section";
};
export type ArticleSectionImageSet_section$key = {
  readonly " $data"?: ArticleSectionImageSet_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionImageSet_section">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "normalized",
    "larger",
    "large"
  ]
},
v1 = [
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
    "name": "width",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Image",
    "kind": "LinkedField",
    "name": "image",
    "plural": false,
    "selections": [
      {
        "alias": "small",
        "args": [
          {
            "kind": "Literal",
            "name": "height",
            "value": 80
          },
          (v0/*: any*/),
          {
            "kind": "Literal",
            "name": "width",
            "value": 80
          }
        ],
        "concreteType": "CroppedImageUrl",
        "kind": "LinkedField",
        "name": "cropped",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "cropped(height:80,version:[\"normalized\",\"larger\",\"large\"],width:80)"
      },
      {
        "alias": "large",
        "args": [
          (v0/*: any*/),
          {
            "kind": "Literal",
            "name": "width",
            "value": 1220
          }
        ],
        "concreteType": "ResizedImageUrl",
        "kind": "LinkedField",
        "name": "resized",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:1220)"
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionImageSet_section",
  "selections": [
    {
      "alias": "setLayout",
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
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
      "concreteType": "ArticleSectionImageSetCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "figures",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "cover",
      "plural": false,
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
          "selections": (v2/*: any*/),
          "type": "ArticleImageSection",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "Artwork",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionImageSet",
  "abstractKey": null
};
})();

(node as any).hash = "754c1ebca79c6e90ed16f13e38231dde";

export default node;
