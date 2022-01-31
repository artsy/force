/**
 * @generated SignedSource<<6c4eb38e801c082cdd65cae23b9e3160>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesArtworksFilter_artistSeries$data = {
  readonly filtered_artworks: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
  } | null;
  readonly " $fragmentType": "ArtistSeriesArtworksFilter_artistSeries";
};
export type ArtistSeriesArtworksFilter_artistSeries$key = {
  readonly " $data"?: ArtistSeriesArtworksFilter_artistSeries$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesArtworksFilter_artistSeries">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesArtworksFilter_artistSeries",
  "selections": [
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistSeries",
  "abstractKey": null
};

(node as any).hash = "4a11fbffa1639a06de13dd34dbf81eeb";

export default node;
