/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesHeader_artistSeries = {
    readonly title: string;
    readonly artworksCountMessage: string | null;
    readonly descriptionFormatted: string | null;
    readonly image: {
        readonly xs: {
            readonly url: string | null;
        } | null;
        readonly sm: {
            readonly url: string | null;
        } | null;
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
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
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
      "name": "artworksCountMessage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "descriptionFormatted",
      "storageKey": "descriptionFormatted(format:\"HTML\")"
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
          "alias": "xs",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 360
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "large"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 360
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:360,version:\"large\",width:360)"
        },
        {
          "alias": "sm",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "normalized"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 1200
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "resized(version:\"normalized\",width:1200)"
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    },
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
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
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
(node as any).hash = 'b8723c21790e37b227b7419e250b34ed';
export default node;
