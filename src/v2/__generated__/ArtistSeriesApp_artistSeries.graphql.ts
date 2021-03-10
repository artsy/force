/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesApp_artistSeries = {
    readonly railArtist: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesRail_artist">;
    } | null> | null;
    readonly internalID: string;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesMeta_artistSeries" | "ArtistSeriesHeader_artistSeries" | "ArtistSeriesArtworksFilter_artistSeries">;
    readonly " $refType": "ArtistSeriesApp_artistSeries";
};
export type ArtistSeriesApp_artistSeries$data = ArtistSeriesApp_artistSeries;
export type ArtistSeriesApp_artistSeries$key = {
    readonly " $data"?: ArtistSeriesApp_artistSeries$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesApp_artistSeries">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input",
      "type": "FilterArtworksInput"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesApp_artistSeries",
  "selections": [
    {
      "alias": "railArtist",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 1
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistSeriesRail_artist"
        }
      ],
      "storageKey": "artists(size:1)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesMeta_artistSeries"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesHeader_artistSeries"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtistSeriesArtworksFilter_artistSeries"
    }
  ],
  "type": "ArtistSeries"
};
(node as any).hash = 'e9fd84f6e5a295d9e6b2d0ccc1891421';
export default node;
