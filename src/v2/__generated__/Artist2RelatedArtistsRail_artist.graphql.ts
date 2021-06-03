/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2RelatedArtistsRail_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly related: {
        readonly artistsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly name: string | null;
                    readonly href: string | null;
                    readonly internalID: string;
                    readonly slug: string;
                    readonly nationality: string | null;
                    readonly birthday: string | null;
                    readonly filterArtworksConnection: {
                        readonly edges: ReadonlyArray<{
                            readonly node: {
                                readonly internalID: string;
                                readonly slug: string;
                                readonly image: {
                                    readonly resized: {
                                        readonly width: number | null;
                                        readonly height: number | null;
                                        readonly src: string;
                                        readonly srcSet: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null> | null;
                    } | null;
                    readonly image: {
                        readonly resized: {
                            readonly url: string;
                        } | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    readonly " $refType": "Artist2RelatedArtistsRail_artist";
};
export type Artist2RelatedArtistsRail_artist$data = Artist2RelatedArtistsRail_artist;
export type Artist2RelatedArtistsRail_artist$key = {
    readonly " $data"?: Artist2RelatedArtistsRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2RelatedArtistsRail_artist">;
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
  "name": "Artist2RelatedArtistsRail_artist",
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
                                      "concreteType": "ResizedImageUrl",
                                      "kind": "LinkedField",
                                      "name": "resized",
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
                                      "storageKey": "resized(height:230,width:325)"
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
                          "concreteType": "ResizedImageUrl",
                          "kind": "LinkedField",
                          "name": "resized",
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
                          "storageKey": "resized(height:50,width:50)"
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
          "storageKey": "artistsConnection(first:20,kind:\"MAIN\")"
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
  "type": "Artist"
};
})();
(node as any).hash = '59f31f81bb2da34f3703ea8f66017678';
export default node;
