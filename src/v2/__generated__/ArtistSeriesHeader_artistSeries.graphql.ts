/* tslint:disable */

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
  "kind": "LinkedField",
  "alias": null,
  "name": "image",
  "storageKey": null,
  "args": null,
  "concreteType": "Image",
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
};
return {
  "kind": "Fragment",
  "name": "ArtistSeriesHeader_artistSeries",
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
      "name": "description",
      "args": null,
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": "artists(size:1)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 1
        }
      ],
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
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
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist",
          "args": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'f31639df0433b44fb4f5aa094edf9b17';
export default node;
