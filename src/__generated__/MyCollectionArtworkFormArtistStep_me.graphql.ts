/**
 * @generated SignedSource<<b20893dc0dd70b7e5642ac880bed8152>>
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
            readonly artworks: any | null | undefined;
          } | null | undefined;
          readonly displayLabel: string | null | undefined;
          readonly formattedNationalityAndBirthday: string | null | undefined;
          readonly image: {
            readonly cropped: {
              readonly src: string;
              readonly srcSet: string;
            } | null | undefined;
          } | null | undefined;
          readonly initials: string | null | undefined;
          readonly internalID: string;
          readonly isPersonalArtist: boolean | null | undefined;
          readonly name: string | null | undefined;
          readonly slug: string;
          readonly targetSupply: {
            readonly isP1: boolean | null | undefined;
            readonly isTargetSupply: boolean | null | undefined;
          };
          readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
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
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "isTargetSupply",
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

(node as any).hash = "de74a264b97ed3b8f327dbe40eaeba60";

export default node;
