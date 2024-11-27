/**
 * @generated SignedSource<<1ea7bc0992f02c48a89f550763129cf7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesApp_artistSeries$data = {
  readonly internalID: string;
  readonly railArtist: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesRail_artist">;
  }>;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesHeader_artistSeries" | "ArtistSeriesMeta_artistSeries">;
  readonly " $fragmentType": "ArtistSeriesApp_artistSeries";
};
export type ArtistSeriesApp_artistSeries$key = {
  readonly " $data"?: ArtistSeriesApp_artistSeries$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesApp_artistSeries">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesApp_artistSeries",
  "selections": [
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
    }
  ],
  "type": "ArtistSeries",
  "abstractKey": null
};

(node as any).hash = "07d450e96542574edcbdf65e8f45f035";

export default node;
