/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesItem_artistSeries = {
    readonly title: string;
    readonly slug: string;
    readonly artworksCountMessage: string | null;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesItem_artistSeries",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworksCountMessage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 320
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 320
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:320,width:320)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistSeries"
};
(node as any).hash = 'a2e98d0362c528e8d4573ae9ca9ac07d';
export default node;
