/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntityTooltipArtist_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly formattedNationalityAndBirthday: string | null;
    readonly blurb: string | null;
    readonly carousel: {
        readonly images: ReadonlyArray<{
            readonly resized: {
                readonly src: string;
                readonly srcSet: string;
                readonly height: number | null;
                readonly width: number | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    readonly " $refType": "EntityTooltipArtist_artist";
};
export type EntityTooltipArtist_artist$data = EntityTooltipArtist_artist;
export type EntityTooltipArtist_artist$key = {
    readonly " $data"?: EntityTooltipArtist_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"EntityTooltipArtist_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityTooltipArtist_artist",
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
      "name": "href",
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
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "PLAIN"
        }
      ],
      "kind": "ScalarField",
      "name": "blurb",
      "storageKey": "blurb(format:\"PLAIN\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCarousel",
      "kind": "LinkedField",
      "name": "carousel",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "images",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 100
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
                },
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
                }
              ],
              "storageKey": "resized(height:100)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '777f88f7db41146b322dfc91121ae85e';
export default node;
