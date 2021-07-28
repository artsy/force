/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCard_artist = {
    readonly name: string | null;
    readonly slug: string;
    readonly href: string | null;
    readonly image: {
        readonly cropped: {
            readonly src: string;
        } | null;
    } | null;
    readonly formatted_nationality_and_birthday: string | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    readonly " $refType": "ArtistCard_artist";
};
export type ArtistCard_artist$data = ArtistCard_artist;
export type ArtistCard_artist$key = {
    readonly " $data"?: ArtistCard_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCard_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCard_artist",
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
      "kind": "ScalarField",
      "name": "slug",
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
              "value": 90
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 90
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
            }
          ],
          "storageKey": "cropped(height:90,width:90)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "formatted_nationality_and_birthday",
      "args": null,
      "kind": "ScalarField",
      "name": "formattedNationalityAndBirthday",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '411fc5e9d4e9901f3ea252f91f4c35b2';
export default node;
