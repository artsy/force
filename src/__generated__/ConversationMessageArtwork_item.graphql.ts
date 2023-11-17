/**
 * @generated SignedSource<<591ee159a8d2d845f84b60fddd7c98a9>>
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
    readonly imageURL: string | null;
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
              "alias": "imageURL",
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "large"
                  ]
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:[\"large\"])"
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

(node as any).hash = "193455c1e5c5987b5bf5c4b4775b6040";

export default node;
