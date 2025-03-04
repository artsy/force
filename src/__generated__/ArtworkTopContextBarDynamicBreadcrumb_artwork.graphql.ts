/**
 * @generated SignedSource<<8453f618a78909688c936671f2a9832c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBarDynamicBreadcrumb_artwork$data = {
  readonly contextMatch: {
    readonly __typename: string;
    readonly coverImage?: {
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly href?: string | null | undefined;
    readonly isAuction?: boolean | null | undefined;
    readonly isBenefit?: boolean | null | undefined;
    readonly isGalleryAuction?: boolean | null | undefined;
    readonly name?: string | null | undefined;
    readonly partner?: {
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly profile?: {
      readonly icon: {
        readonly url: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly status?: string | null | undefined;
    readonly thumbnail?: {
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"RegistrationAuctionTimer_sale">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarBreadcrumb_artwork">;
  readonly " $fragmentType": "ArtworkTopContextBarDynamicBreadcrumb_artwork";
};
export type ArtworkTopContextBarDynamicBreadcrumb_artwork$key = {
  readonly " $data"?: ArtworkTopContextBarDynamicBreadcrumb_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarDynamicBreadcrumb_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v3 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "contextMatchId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "contextMatchType"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkTopContextBarDynamicBreadcrumb_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkTopContextBarBreadcrumb_artwork"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "contextMatchId"
        },
        {
          "kind": "Variable",
          "name": "type",
          "variableName": "contextMatchType"
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "contextMatch",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "RegistrationAuctionTimer_sale"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
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
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": (v3/*: any*/),
              "storageKey": null
            }
          ],
          "type": "Sale",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
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
                  "selections": (v2/*: any*/),
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
            (v1/*: any*/),
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
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": (v3/*: any*/),
                  "type": "Partner",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v3/*: any*/),
                  "type": "ExternalPartner",
                  "abstractKey": null
                }
              ],
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

(node as any).hash = "0dfc9c9d9ad8448949b56e39adcfe19e";

export default node;
