/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesApp_artistSeries = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesHeader_artistSeries">;
    readonly " $refType": "ArtistSeriesApp_artistSeries";
};
export type ArtistSeriesApp_artistSeries$data = ArtistSeriesApp_artistSeries;
export type ArtistSeriesApp_artistSeries$key = {
    readonly " $data"?: ArtistSeriesApp_artistSeries$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesApp_artistSeries">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistSeriesApp_artistSeries",
  "type": "ArtistSeries",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistSeriesHeader_artistSeries",
      "args": null
    }
  ]
};
(node as any).hash = '39dba1f661fe054a7acf8582256c4f96';
export default node;
