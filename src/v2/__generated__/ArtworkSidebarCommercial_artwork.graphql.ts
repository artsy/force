/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": "is_acquireable",
  "name": "isAcquireable",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": "is_offerable",
  "name": "isOfferable",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": "sale_message",
  "name": "saleMessage",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarCommercial_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": "is_for_sale",
      "name": "isForSale",
      "args": null,
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "kind": "ScalarField",
      "alias": "is_inquireable",
      "name": "isInquireable",
      "args": null,
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "listPrice",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "type": "PriceRange",
          "selections": (v3/*: any*/)
        },
        {
          "kind": "InlineFragment",
          "type": "Money",
          "selections": (v3/*: any*/)
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "priceIncludesTaxDisplay",
      "args": null,
      "storageKey": null
    },
    (v4/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "shippingInfo",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "shippingOrigin",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "edition_sets",
      "name": "editionSets",
      "storageKey": null,
      "args": null,
      "concreteType": "EditionSet",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        (v1/*: any*/),
        (v2/*: any*/),
        (v4/*: any*/),
        {
          "kind": "FragmentSpread",
          "name": "ArtworkSidebarSizeInfo_piece",
          "args": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = '4b27f5f48c80ad681cc7752ca8fe9638';
export default node;
