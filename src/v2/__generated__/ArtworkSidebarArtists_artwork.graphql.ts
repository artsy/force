/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtists_artwork = {
    readonly cultural_maker: string | null;
    readonly artists: ReadonlyArray<{
        readonly id: string;
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly formattedNationalityAndBirthday: string | null;
        readonly href: string | null;
        readonly avatar: {
            readonly cropped: {
                readonly src: string;
            } | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    } | null> | null;
    readonly " $refType": "ArtworkSidebarArtists_artwork";
};
export type ArtworkSidebarArtists_artwork$data = ArtworkSidebarArtists_artwork;
export type ArtworkSidebarArtists_artwork$key = {
    readonly " $data"?: ArtworkSidebarArtists_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarArtists_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "showFollowSuggestions",
      "type": "Boolean"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarArtists_artwork",
  "selections": [
    {
      "alias": "cultural_maker",
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
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
          "name": "formattedNationalityAndBirthday",
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
          "alias": "avatar",
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
                  "value": 300
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 300
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
              "storageKey": "cropped(height:300,width:300)"
            }
          ],
          "storageKey": null
        },
        {
          "args": [
            {
              "kind": "Variable",
              "name": "showFollowSuggestions",
              "variableName": "showFollowSuggestions"
            }
          ],
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '072bbede5100199180b1b913f242fd11';
export default node;
