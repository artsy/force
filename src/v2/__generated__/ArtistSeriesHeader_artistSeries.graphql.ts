/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesHeader_artistSeries = {
    readonly title: string;
    readonly description: string | null;
    readonly image: {
        readonly url: string | null;
    } | null;
    readonly artists: ReadonlyArray<{
        readonly name: string | null;
        readonly image: {
            readonly url: string | null;
        } | null;
        readonly href: string | null;
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    } | null> | null;
    readonly " $refType": "ArtistSeriesHeader_artistSeries";
};
export type ArtistSeriesHeader_artistSeries$data = ArtistSeriesHeader_artistSeries;
export type ArtistSeriesHeader_artistSeries$key = {
    readonly " $data"?: ArtistSeriesHeader_artistSeries$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesHeader_artistSeries">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
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
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesHeader_artistSeries",
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
      "name": "description",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
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
          "name": "FollowArtistButton_artist"
        }
      ],
      "storageKey": "artists(size:1)"
    }
  ],
  "type": "ArtistSeries"
};
})();
(node as any).hash = 'f31639df0433b44fb4f5aa094edf9b17';
export default node;
