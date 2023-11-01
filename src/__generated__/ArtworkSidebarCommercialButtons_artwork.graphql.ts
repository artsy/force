/**
 * @generated SignedSource<<bc0079bea3822565711119dcfe62759e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCommercialButtons_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
  } | null> | null;
  readonly attributionClass: {
    readonly internalID: string;
  } | null;
  readonly editionSets: ReadonlyArray<{
    readonly id: string;
    readonly internalID: string;
    readonly isAcquireable: boolean | null;
    readonly isOfferable: boolean | null;
    readonly saleMessage: string | null;
  } | null> | null;
  readonly internalID: string;
  readonly isAcquireable: boolean | null;
  readonly isEligibleToCreateAlert: boolean;
  readonly isInquireable: boolean | null;
  readonly isOfferable: boolean | null;
  readonly isSold: boolean | null;
  readonly listPrice: {
    readonly display?: string | null;
  } | null;
  readonly mediumType: {
    readonly filterGene: {
      readonly slug: string;
    } | null;
  } | null;
  readonly saleMessage: string | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkCreateAlertButton_artwork" | "ArtworkSidebarEditionSets_artwork">;
  readonly " $fragmentType": "ArtworkSidebarCommercialButtons_artwork";
};
export type ArtworkSidebarCommercialButtons_artwork$key = {
  readonly " $data"?: ArtworkSidebarCommercialButtons_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCommercialButtons_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v6 = [
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
  "name": "ArtworkSidebarCommercialButtons_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarEditionSets_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkCreateAlertButton_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEligibleToCreateAlert",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    (v0/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInquireable",
      "storageKey": null
    },
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSold",
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
        {
          "kind": "InlineFragment",
          "selections": (v6/*: any*/),
          "type": "PriceRange",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v6/*: any*/),
          "type": "Money",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Gene",
          "kind": "LinkedField",
          "name": "filterGene",
          "plural": false,
          "selections": [
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EditionSet",
      "kind": "LinkedField",
      "name": "editionSets",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "65b5bfc80282f94267329fb613fdccc8";

export default node;
