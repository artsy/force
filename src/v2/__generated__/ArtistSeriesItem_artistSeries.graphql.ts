/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesItem_artistSeries = {
    readonly title: string;
    readonly slug: string;
    readonly forSaleArtworksCount: number;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistSeriesItem_artistSeries";
};
export type ArtistSeriesItem_artistSeries$data = ArtistSeriesItem_artistSeries;
export type ArtistSeriesItem_artistSeries$key = {
    readonly " $data"?: ArtistSeriesItem_artistSeries$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesItem_artistSeries">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistSeriesItem_artistSeries",
  "type": "ArtistSeries",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "forSaleArtworksCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:160,width:160)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 160
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 160
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '7819304847a520aab927606e86cac175';
export default node;
