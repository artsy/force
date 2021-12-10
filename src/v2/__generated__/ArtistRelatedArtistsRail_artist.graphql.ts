/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedArtistsRail_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly related: {
        readonly artistsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly name: string | null;
                    readonly href: string | null;
                    readonly internalID: string;
                    readonly isFollowed: boolean | null;
                    readonly slug: string;
                    readonly nationality: string | null;
                    readonly birthday: string | null;
                    readonly filterArtworksConnection: {
                        readonly edges: ReadonlyArray<{
                            readonly node: {
                                readonly internalID: string;
                                readonly slug: string;
                                readonly image: {
                                    readonly cropped: {
                                        readonly width: number;
                                        readonly height: number;
                                        readonly src: string;
                                        readonly srcSet: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null> | null;
                    } | null;
                    readonly image: {
                        readonly cropped: {
                            readonly url: string;
                        } | null;
                    } | null;
                    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistRelatedArtistsRail_artist";
};
export type ArtistRelatedArtistsRail_artist$data = ArtistRelatedArtistsRail_artist;
export type ArtistRelatedArtistsRail_artist$key = {
    readonly " $data"?: ArtistRelatedArtistsRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistRelatedArtistsRail_artist">;
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
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRelatedArtistsRail_artist",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "kind": "LinkedField",
      "name": "related",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 20
            },
            {
              "kind": "Literal",
              "name": "kind",
              "value": "MAIN"
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
                    (v0/*: any*/),
                    (v1/*: any*/),
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isFollowed",
                      "storageKey": null
                    },
                    (v3/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "nationality",
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
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "first",
                          "value": 1
                        },
                        {
                          "kind": "Literal",
                          "name": "sort",
                          "value": "-weighted_iconicity"
                        }
                      ],
                      "concreteType": "FilterArtworksConnection",
                      "kind": "LinkedField",
                      "name": "filterArtworksConnection",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "FilterArtworksEdge",
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
                                (v2/*: any*/),
                                (v3/*: any*/),
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
                                          "name": "width",
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
                                      "storageKey": "cropped(height:230,width:325)"
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
                      "storageKey": "filterArtworksConnection(first:1,sort:\"-weighted_iconicity\")"
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
                              "value": 50
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 50
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
                              "name": "url",
                              "storageKey": null
                            }
                          ],
                          "storageKey": "cropped(height:50,width:50)"
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
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artistsConnection(first:20,kind:\"MAIN\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();
(node as any).hash = '9b43c5b91bd9eeb8d5ada9cd9ceb7d6b';
export default node;
