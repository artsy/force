/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollectionLayout = "COLUMN_WIDTH" | "FILLWIDTH" | "OVERFLOW_FILLWIDTH" | "%future added value";
export type ArticleSectionImageCollection_section = {
    readonly layout: ArticleSectionImageCollectionLayout;
    readonly figures: ReadonlyArray<{
        readonly __typename: "ArticleImageSection";
        readonly id: string;
        readonly caption: string | null;
        readonly image: {
            readonly resized: {
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
            readonly resized: {
                readonly src: string;
                readonly srcSet: string;
                readonly height: number | null;
                readonly width: number | null;
            } | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork">;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }>;
    readonly " $refType": "ArticleSectionImageCollection_section";
};
export type ArticleSectionImageCollection_section$data = ArticleSectionImageCollection_section;
export type ArticleSectionImageCollection_section$key = {
    readonly " $data"?: ArticleSectionImageCollection_section$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSectionImageCollection_section">;
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
            "normalized",
            "larger",
            "large"
          ]
        },
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
      "selections": [
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
      "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:1220)"
    }
  ],
  "storageKey": null
};
return {
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
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "caption",
              "storageKey": null
            },
            (v1/*: any*/)
          ],
          "type": "ArticleImageSection",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Metadata_artwork"
            }
          ],
          "type": "Artwork",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionImageCollection",
  "abstractKey": null
};
})();
(node as any).hash = '8b0a0cf164dd48f2cf3d1ec9e0bbce17';
export default node;
