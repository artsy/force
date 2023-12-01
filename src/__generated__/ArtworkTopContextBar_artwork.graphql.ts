/**
 * @generated SignedSource<<01416075ff4659528ac5f1d30b9519ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBar_artwork$data = {
  readonly context: {
    readonly __typename: "Fair";
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
    readonly profile: {
      readonly icon: {
        readonly url: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | {
    readonly __typename: "Sale";
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
  } | {
    readonly __typename: "Show";
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
    readonly status: string | null | undefined;
    readonly thumbnail: {
      readonly url: string | null | undefined;
    } | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly partner: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly sale: {
    readonly coverImage: {
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly isAuction: boolean | null | undefined;
    readonly isBenefit: boolean | null | undefined;
    readonly isGalleryAuction: boolean | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"RegistrationAuctionTimer_sale">;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkTopContextBar_artwork";
};
export type ArtworkTopContextBar_artwork$key = {
  readonly " $data"?: ArtworkTopContextBar_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBar_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkTopContextBar_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isBenefit",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isGalleryAuction",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "coverImage",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "RegistrationAuctionTimer_sale"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "context",
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
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/)
          ],
          "type": "Sale",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Profile",
              "kind": "LinkedField",
              "name": "profile",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "icon",
                  "plural": false,
                  "selections": (v1/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "Fair",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "status",
              "storageKey": null
            },
            {
              "alias": "thumbnail",
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "coverImage",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            }
          ],
          "type": "Show",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "b7a3b152d9e93a73ee7d0f513bf48c6f";

export default node;
