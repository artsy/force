/**
 * @generated SignedSource<<92566393256049993cc9909b751b2494>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessageArtwork_item$data = {
  readonly __typename: "Artwork";
  readonly artistNames: string | null;
  readonly date: string | null;
  readonly href: string | null;
  readonly id: string;
  readonly image: {
    readonly aspectRatio: number;
    readonly resized: {
      readonly height: number | null;
      readonly url: string;
      readonly width: number | null;
    } | null;
  } | null;
  readonly internalID: string;
  readonly isOfferableFromInquiry: boolean | null;
  readonly listPrice: {
    readonly __typename: "Money";
    readonly display: string | null;
  } | {
    readonly __typename: "PriceRange";
    readonly display: string | null;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
  readonly title: string | null;
  readonly " $fragmentType": "ConversationMessageArtwork_item";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ConversationMessageArtwork_item";
};
export type ConversationMessageArtwork_item$key = {
  readonly " $data"?: ConversationMessageArtwork_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessageArtwork_item">;
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
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationMessageArtwork_item",
  "selections": [
    (v0/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
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
          "kind": "ScalarField",
          "name": "date",
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
          "kind": "ScalarField",
          "name": "artistNames",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isOfferableFromInquiry",
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
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 1350
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
                  "name": "url",
                  "storageKey": null
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
              "storageKey": "resized(width:1350)"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "aspectRatio",
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
          "name": "listPrice",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v1/*: any*/),
              "type": "Money",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v1/*: any*/),
              "type": "PriceRange",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "Artwork",
      "abstractKey": null
    }
  ],
  "type": "ConversationItemType",
  "abstractKey": "__isConversationItemType"
};
})();

(node as any).hash = "f0e0f1df1920e550694c3787309033bf";

export default node;
