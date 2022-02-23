/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type ArtistArtworkFilter_me = {
    readonly lengthUnitPreference: LengthUnitPreference;
    readonly " $refType": "ArtistArtworkFilter_me";
};
export type ArtistArtworkFilter_me$data = ArtistArtworkFilter_me;
export type ArtistArtworkFilter_me$key = {
    readonly " $data"?: ArtistArtworkFilter_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistArtworkFilter_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistArtworkFilter_me",
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
(node as any).hash = 'a8ca91429b9150076f95c97225bc4a95';
export default node;
