/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkInquiry_artwork = {
    readonly internalID: string;
    readonly title: string | null;
    readonly date: string | null;
    readonly artist: {
        readonly name: string | null;
    } | null;
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly image: {
        readonly resized: {
            readonly height: number | null;
            readonly width: number | null;
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "ArtworkInquiry_artwork";
};
export type ArtworkInquiry_artwork$data = ArtworkInquiry_artwork;
export type ArtworkInquiry_artwork$key = {
    readonly " $data"?: ArtworkInquiry_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkInquiry_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkInquiry_artwork",
  "selections": [
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": (v0/*: any*/),
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
              "value": 45
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 60
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "resized(height:45,width:60)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = '9c61b8e4423e8e25bac7653ea9828813';
export default node;
