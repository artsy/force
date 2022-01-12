/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCommercial_artwork = {
    readonly edition_sets: ReadonlyArray<{
        readonly internalID: string;
        readonly id: string;
        readonly is_acquireable: boolean | null;
        readonly is_offerable: boolean | null;
        readonly sale_message: string | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarSizeInfo_piece">;
    } | null> | null;
    readonly category: string | null;
    readonly internalID: string;
    readonly isOfferableFromInquiry: boolean | null;
    readonly isPriceHidden: boolean | null;
    readonly is_acquireable: boolean | null;
    readonly is_for_sale: boolean | null;
    readonly is_inquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly listPrice: {
        readonly display?: string | null;
    } | null;
    readonly priceIncludesTaxDisplay: string | null;
    readonly sale_message: string | null;
    readonly shippingInfo: string | null;
    readonly shippingOrigin: string | null;
    readonly slug: string;
    readonly " $refType": "ArtworkSidebarCommercial_artwork";
};
export type ArtworkSidebarCommercial_artwork$data = ArtworkSidebarCommercial_artwork;
export type ArtworkSidebarCommercial_artwork$key = {
    readonly " $data"?: ArtworkSidebarCommercial_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCommercial_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": "is_acquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v2 = {
  "alias": "is_offerable",
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v3 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v4 = [
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
  "name": "ArtworkSidebarCommercial_artwork",
  "selections": [
    {
      "alias": "edition_sets",
      "args": null,
      "concreteType": "EditionSet",
      "kind": "LinkedField",
      "name": "editionSets",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkSidebarSizeInfo_piece"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "isPriceHidden",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": "is_for_sale",
      "args": null,
      "kind": "ScalarField",
      "name": "isForSale",
      "storageKey": null
    },
    {
      "alias": "is_inquireable",
      "args": null,
      "kind": "ScalarField",
      "name": "isInquireable",
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "listPrice",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v4/*: any*/),
          "type": "PriceRange",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v4/*: any*/),
          "type": "Money",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceIncludesTaxDisplay",
      "storageKey": null
    },
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingInfo",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingOrigin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = 'ebf4dac69c7a75ecbbd973d1b848ef3e';
export default node;
