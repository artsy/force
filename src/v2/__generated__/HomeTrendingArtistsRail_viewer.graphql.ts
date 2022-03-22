/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeTrendingArtistsRail_viewer = {
    readonly artistsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly isFollowed: boolean | null;
                readonly name: string | null;
                readonly slug: string;
                readonly href: string | null;
                readonly formattedNationalityAndBirthday: string | null;
                readonly image: {
                    readonly cropped: {
                        readonly src: string;
                        readonly srcSet: string;
                        readonly width: number;
                        readonly height: number;
                    } | null;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist" | "ArtistEntityHeader_artist">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "HomeTrendingArtistsRail_viewer";
};
export type HomeTrendingArtistsRail_viewer$data = HomeTrendingArtistsRail_viewer;
export type HomeTrendingArtistsRail_viewer$key = {
    readonly " $data"?: HomeTrendingArtistsRail_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeTrendingArtistsRail_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeTrendingArtistsRail_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 99
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "TRENDING_DESC"
        }
      ],
      "concreteType": "ArtistConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                  "name": "isFollowed",
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
                  "kind": "ScalarField",
                  "name": "formattedNationalityAndBirthday",
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
                          "value": 230
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 325
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
                      "storageKey": "cropped(height:230,width:325)"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FollowArtistButton_artist"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistEntityHeader_artist"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistsConnection(first:99,sort:\"TRENDING_DESC\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '4935b1dcbf3fff7c4314b5a9e8eec6ae';
export default node;
