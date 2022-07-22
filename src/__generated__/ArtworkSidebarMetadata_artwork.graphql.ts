/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarMetadata_artwork = {
    readonly is_biddable: boolean | null;
    readonly edition_sets: ReadonlyArray<{
        readonly __typename: string;
    } | null> | null;
    readonly sale_artwork: {
        readonly lot_label: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarTitleInfo_artwork" | "ArtworkSidebarSizeInfo_piece" | "ArtworkSidebarClassification_artwork">;
    readonly " $refType": "ArtworkSidebarMetadata_artwork";
};
export type ArtworkSidebarMetadata_artwork$data = ArtworkSidebarMetadata_artwork;
export type ArtworkSidebarMetadata_artwork$key = {
    readonly " $data"?: ArtworkSidebarMetadata_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarMetadata_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarMetadata_artwork",
  "selections": [
    {
      "alias": "is_biddable",
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "sale_artwork",
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        {
          "alias": "lot_label",
          "args": null,
          "kind": "ScalarField",
          "name": "lotLabel",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarTitleInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarSizeInfo_piece"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarClassification_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'ee1d620cfeeb5424fe48e300e387ffa4';
export default node;
