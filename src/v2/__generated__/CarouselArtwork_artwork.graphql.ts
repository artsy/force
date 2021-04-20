/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CarouselArtwork_artwork = {
    readonly image: {
        readonly resized: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly aspectRatio: number;
        readonly height: number | null;
    } | null;
    readonly imageTitle: string | null;
    readonly title: string | null;
    readonly href: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork" | "SaveButton_artwork" | "Badge_artwork">;
    readonly " $refType": "CarouselArtwork_artwork";
};
export type CarouselArtwork_artwork$data = CarouselArtwork_artwork;
export type CarouselArtwork_artwork$key = {
    readonly " $data"?: CarouselArtwork_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"CarouselArtwork_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 200,
      "kind": "LocalArgument",
      "name": "width",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CarouselArtwork_artwork",
  "selections": [
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
              "kind": "Variable",
              "name": "width",
              "variableName": "width"
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
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageTitle",
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
      "name": "href",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Metadata_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaveButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Badge_artwork"
    }
  ],
  "type": "Artwork"
};
(node as any).hash = 'f7d27bdc9c148144b08532bde8717860';
export default node;
