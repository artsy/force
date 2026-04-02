/**
 * @generated SignedSource<<92e9bc4f0eeebb17af04109bb6a430df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStructuredData_artist$data = {
  readonly alternateNames: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly awards: string | null | undefined;
  readonly biographyBlurbPlain: {
    readonly text: string | null | undefined;
  } | null | undefined;
  readonly birthday: string | null | undefined;
  readonly coverArtwork: {
    readonly image: {
      readonly cropped: {
        readonly height: number;
        readonly src: string;
        readonly width: number;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly deathday: string | null | undefined;
  readonly gender: string | null | undefined;
  readonly genes: ReadonlyArray<{
    readonly name: string | null | undefined;
  }>;
  readonly hometown: string | null | undefined;
  readonly href: string | null | undefined;
  readonly name: string | null | undefined;
  readonly nationality: string | null | undefined;
  readonly notableArtworks: ReadonlyArray<{
    readonly date: string | null | undefined;
    readonly href: string | null | undefined;
    readonly title: string | null | undefined;
  }>;
  readonly slug: string;
  readonly verifiedRepresentatives: ReadonlyArray<{
    readonly partner: {
      readonly href: string | null | undefined;
      readonly name: string | null | undefined;
    };
  }>;
  readonly " $fragmentType": "ArtistStructuredData_artist";
};
export type ArtistStructuredData_artist$key = {
  readonly " $data"?: ArtistStructuredData_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStructuredData_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStructuredData_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alternateNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awards",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "birthday",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deathday",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "gender",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hometown",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nationality",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": "biographyBlurbPlain",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "PLAIN"
        }
      ],
      "concreteType": "ArtistBlurb",
      "kind": "LinkedField",
      "name": "biographyBlurb",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"PLAIN\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "coverArtwork",
      "plural": false,
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
                  "kind": "Literal",
                  "name": "height",
                  "value": 900
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "larger",
                    "large"
                  ]
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 1200
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
                  "name": "width",
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
              "storageKey": "cropped(height:900,version:[\"larger\",\"large\"],width:1200)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "VerifiedRepresentative",
      "kind": "LinkedField",
      "name": "verifiedRepresentatives",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Partner",
          "kind": "LinkedField",
          "name": "partner",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 3
        }
      ],
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "notableArtworks",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "date",
          "storageKey": null
        }
      ],
      "storageKey": "notableArtworks(size:3)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10
        }
      ],
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "genes",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": "genes(size:10)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "208034e52429162bc2a35d986858c777";

export default node;
