/**
 * @generated SignedSource<<52291d040c8e8728f27c6b2b4a2a6c1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkFormArtistStep_me$data = {
  readonly myCollectionInfo: {
    readonly collectedArtistsConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly counts: {
            readonly artworks: any | null;
          } | null;
          readonly displayLabel: string | null;
          readonly formattedNationalityAndBirthday: string | null;
          readonly image: {
            readonly cropped: {
              readonly src: string;
              readonly srcSet: string;
            } | null;
          } | null;
          readonly initials: string | null;
          readonly internalID: string;
          readonly isPersonalArtist: boolean | null;
          readonly name: string | null;
          readonly slug: string;
          readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
        } | null;
      } | null> | null;
    } | null;
  } | null;
  readonly " $fragmentType": "MyCollectionArtworkFormArtistStep_me";
};
export type MyCollectionArtworkFormArtistStep_me$key = {
  readonly " $data"?: MyCollectionArtworkFormArtistStep_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkFormArtistStep_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkFormArtistStep_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyCollectionInfo",
      "kind": "LinkedField",
      "name": "myCollectionInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "includePersonalArtists",
              "value": true
            }
          ],
          "concreteType": "ArtistConnection",
          "kind": "LinkedField",
          "name": "collectedArtistsConnection",
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "EntityHeaderArtist_artist"
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ArtistCounts",
                      "kind": "LinkedField",
                      "name": "counts",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "artworks",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "displayLabel",
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
                              "value": 45
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 45
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
                          "storageKey": "cropped(height:45,width:45)"
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "initials",
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
                      "name": "isPersonalArtist",
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
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "collectedArtistsConnection(first:100,includePersonalArtists:true)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "c1d52d4bc31e54f6b855003ca978f7ff";

export default node;
