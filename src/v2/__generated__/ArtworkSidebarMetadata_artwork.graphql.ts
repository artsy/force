/* tslint:disable */

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
    readonly " $data"?: ArtworkSidebarMetadata_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarMetadata_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarMetadata_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "is_biddable",
      "name": "isBiddable",
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__typename",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "sale_artwork",
      "name": "saleArtwork",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "lot_label",
          "name": "lotLabel",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarTitleInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarSizeInfo_piece",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarClassification_artwork",
      "args": null
    }
  ]
};
(node as any).hash = 'ee1d620cfeeb5424fe48e300e387ffa4';
export default node;
