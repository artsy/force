/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type V2ArtistSeriesItem_artistSeries = {
    readonly title: string;
    readonly slug: string;
    readonly featured: boolean;
    readonly internalID: string;
    readonly artworksCountMessage: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string;
        } | null;
    } | null;
    readonly " $refType": "V2ArtistSeriesItem_artistSeries";
};
export type V2ArtistSeriesItem_artistSeries$data = V2ArtistSeriesItem_artistSeries;
export type V2ArtistSeriesItem_artistSeries$key = {
    readonly " $data"?: V2ArtistSeriesItem_artistSeries$data;
    readonly " $fragmentRefs": FragmentRefs<"V2ArtistSeriesItem_artistSeries">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "V2ArtistSeriesItem_artistSeries",
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
      "name": "featured",
      "storageKey": null
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
(node as any).hash = '4c1d633ae3fe8f37787ccd81e9eee7a6';
export default node;
