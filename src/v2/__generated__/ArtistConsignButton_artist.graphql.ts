/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignButton_artist = {
    readonly targetSupply: {
        readonly isInMicrofunnel: boolean | null;
        readonly isTargetSupply: boolean | null;
    } | null;
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly image: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "ArtistConsignButton_artist";
};
export type ArtistConsignButton_artist$data = ArtistConsignButton_artist;
export type ArtistConsignButton_artist$key = {
    readonly " $data"?: ArtistConsignButton_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignButton_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignButton_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistTargetSupply",
      "kind": "LinkedField",
      "name": "targetSupply",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInMicrofunnel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isTargetSupply",
          "storageKey": null
        }
      ],
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
      "name": "slug",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "href",
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
              "value": 50
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 50
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
          "storageKey": "cropped(height:50,width:50)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '16e052c9bf2ad2292e85f3b3bb2a6ac5';
export default node;
