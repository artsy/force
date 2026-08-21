/**
 * @generated SignedSource<<0bc9a0c10ea120b86eaf8f18de96cc9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSocialRail_artist$data = {
  readonly instagramMedia: ReadonlyArray<{
    readonly caption: string | null | undefined;
    readonly image: {
      readonly cropped: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string | null | undefined;
    readonly permalink: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ArtistSocialRail_artist";
};
export type ArtistSocialRail_artist$key = {
  readonly " $data"?: ArtistSocialRail_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSocialRail_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSocialRail_artist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "ArtistInstagramMedia",
      "kind": "LinkedField",
      "name": "instagramMedia",
      "plural": true,
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
          "name": "permalink",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "srcSet",
                  "storageKey": null
                }
              ],
              "storageKey": "cropped(height:300,width:300)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "instagramMedia(first:20)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "190fe44dcf3451abed0447f1e1333f5a";

export default node;
