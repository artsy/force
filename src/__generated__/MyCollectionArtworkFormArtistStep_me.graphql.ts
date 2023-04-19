/**
 * @generated SignedSource<<d08dcc09cada6fe69179828e346a7b6f>>
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
          readonly targetSupply: {
            readonly isP1: boolean | null;
          } | null;
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
                    },
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
                          "name": "isP1",
                          "storageKey": null
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
          "storageKey": "collectedArtistsConnection(first:100,includePersonalArtists:true)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "68f3932e5f0218e2d93b6fa0bd67aea1";

export default node;
