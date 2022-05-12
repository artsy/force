/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesArtworksFilter_artistSeries = {
    readonly filtered_artworks: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
    } | null;
    readonly " $refType": "ArtistSeriesArtworksFilter_artistSeries";
};
export type ArtistSeriesArtworksFilter_artistSeries$data = ArtistSeriesArtworksFilter_artistSeries;
export type ArtistSeriesArtworksFilter_artistSeries$key = {
    readonly " $data"?: ArtistSeriesArtworksFilter_artistSeries$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesArtworksFilter_artistSeries">;
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
(node as any).hash = '4a11fbffa1639a06de13dd34dbf81eeb';
export default node;
