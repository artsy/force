/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCommercial_artwork = {
    readonly slug: string;
    readonly internalID: string;
    readonly is_for_sale: boolean | null;
    readonly is_acquireable: boolean | null;
    readonly is_inquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly listPrice: {
        readonly display?: string | null;
    } | null;
    readonly priceIncludesTaxDisplay: string | null;
    readonly sale_message: string | null;
    readonly shippingInfo: string | null;
    readonly shippingOrigin: string | null;
    readonly edition_sets: ReadonlyArray<{
        readonly internalID: string;
        readonly id: string;
        readonly is_acquireable: boolean | null;
        readonly is_offerable: boolean | null;
        readonly sale_message: string | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarSizeInfo_piece">;
    } | null> | null;
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
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v4 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarCommercial_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": "is_for_sale",
      "args": null,
      "kind": "ScalarField",
      "name": "isForSale",
      "storageKey": null
    },
    (v1/*: any*/),
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
          "selections": (v3/*: any*/),
          "type": "PriceRange"
        },
        {
          "kind": "InlineFragment",
          "selections": (v3/*: any*/),
          "type": "Money"
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
    (v4/*: any*/),
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
        (v4/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkSidebarSizeInfo_piece"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = '4b27f5f48c80ad681cc7752ca8fe9638';
export default node;
