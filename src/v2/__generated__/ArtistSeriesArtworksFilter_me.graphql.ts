/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type ArtistSeriesArtworksFilter_me = {
    readonly lengthUnitPreference: LengthUnitPreference;
    readonly " $refType": "ArtistSeriesArtworksFilter_me";
};
export type ArtistSeriesArtworksFilter_me$data = ArtistSeriesArtworksFilter_me;
export type ArtistSeriesArtworksFilter_me$key = {
    readonly " $data"?: ArtistSeriesArtworksFilter_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesArtworksFilter_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesArtworksFilter_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lengthUnitPreference",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '6eedb87a1823f2798afefd3143432dd5';
export default node;
