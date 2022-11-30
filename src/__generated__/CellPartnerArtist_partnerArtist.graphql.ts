/**
 * @generated SignedSource<<195aa26c82736caf967c4f01c9e8af1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CellPartnerArtist_partnerArtist$data = {
  readonly artist: {
    readonly href: string | null;
    readonly initials: string | null;
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null;
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly image: {
          readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
          } | null;
        } | null;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "CellPartnerArtist_partnerArtist";
};
export type CellPartnerArtist_partnerArtist$key = {
  readonly " $data"?: CellPartnerArtist_partnerArtist$data;
  readonly " $fragmentSpreads": FragmentRefs<"CellPartnerArtist_partnerArtist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CellPartnerArtist_partnerArtist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
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
                          "value": 334
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
                          "value": 445
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
                      "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:1)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderArtist_artist"
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
          "kind": "ScalarField",
          "name": "initials",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistPartnerEdge",
  "abstractKey": null
};

(node as any).hash = "7a4f059eb9251c901b915ff7cd6cfb0c";

export default node;
