/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Overview_artist = {
    readonly slug: string;
    readonly id: string;
    readonly statuses: {
        readonly artworks: boolean | null;
        readonly cv: boolean | null;
    } | null;
    readonly counts: {
        readonly partner_shows: number | null;
        readonly forSaleArtworks: number | null;
        readonly ecommerce_artworks: number | null;
        readonly auction_artworks: number | null;
        readonly artworks: number | null;
        readonly has_make_offer_artworks: boolean | null;
    } | null;
    readonly href: string | null;
    readonly name: string | null;
    readonly biographyBlurb: {
        readonly text: string | null;
    } | null;
    readonly currentEvent: {
        readonly name: string | null;
    } | null;
    readonly related: {
        readonly genes: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly slug: string;
                } | null;
            } | null> | null;
        } | null;
        readonly artistsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly showsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly name: string | null;
                readonly href: string | null;
                readonly exhibitionPeriod: string | null;
                readonly coverImage: {
                    readonly cropped: {
                        readonly url: string;
                        readonly width: number;
                        readonly height: number;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly articlesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly href: string | null;
                readonly thumbnailTitle: string | null;
                readonly publishedAt: string | null;
                readonly thumbnailImage: {
                    readonly cropped: {
                        readonly url: string;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly internalID: string;
    readonly collections: ReadonlyArray<string | null> | null;
    readonly highlights: {
        readonly partnersConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly categories: ReadonlyArray<{
                        readonly slug: string;
                    } | null> | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly insights: ReadonlyArray<{
        readonly type: string | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistBio_bio" | "CurrentEvent_artist" | "MarketInsights_artist" | "SelectedCareerAchievements_artist" | "Genes_artist" | "FollowArtistButton_artist" | "WorksForSaleRail_artist" | "ArtistConsignButton_artist" | "ArtistTopWorksRail_artist">;
    readonly " $refType": "Overview_artist";
};
export type Overview_artist$data = Overview_artist;
export type Overview_artist$key = {
    readonly " $data"?: Overview_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Overview_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artworks",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v0/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": [
        "blue-chip",
        "top-established",
        "top-emerging"
      ],
      "kind": "LocalArgument",
      "name": "partnerCategory",
      "type": "[String]"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Overview_artist",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistStatuses",
      "kind": "LinkedField",
      "name": "statuses",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "minShowCount",
              "value": 0
            }
          ],
          "kind": "ScalarField",
          "name": "cv",
          "storageKey": "cv(minShowCount:0)"
        }
      ],
      "storageKey": null
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
          "alias": "partner_shows",
          "args": null,
          "kind": "ScalarField",
          "name": "partnerShows",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "forSaleArtworks",
          "storageKey": null
        },
        {
          "alias": "ecommerce_artworks",
          "args": null,
          "kind": "ScalarField",
          "name": "ecommerceArtworks",
          "storageKey": null
        },
        {
          "alias": "auction_artworks",
          "args": null,
          "kind": "ScalarField",
          "name": "auctionArtworks",
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "alias": "has_make_offer_artworks",
          "args": null,
          "kind": "ScalarField",
          "name": "hasMakeOfferArtworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v3/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        },
        {
          "kind": "Literal",
          "name": "partnerBio",
          "value": true
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
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurrentEvent",
      "kind": "LinkedField",
      "name": "currentEvent",
      "plural": false,
      "selections": [
        (v4/*: any*/)
      ],
      "storageKey": null
    },
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
          "args": null,
          "concreteType": "GeneConnection",
          "kind": "LinkedField",
          "name": "genes",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GeneEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Gene",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": (v5/*: any*/),
                  "storageKey": null
                }
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
              "name": "first",
              "value": 1
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
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artistsConnection(first:1)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "running"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ShowEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Show",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v4/*: any*/),
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "exhibitionPeriod",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "coverImage",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 140
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 220
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": [
                        (v6/*: any*/),
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
                      "storageKey": "cropped(height:140,width:220)"
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
      "storageKey": "showsConnection(first:5,sort:\"END_AT_ASC\",status:\"running\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 4
        },
        {
          "kind": "Literal",
          "name": "inEditorialFeed",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
        }
      ],
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Article",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "thumbnailTitle",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "MMM Do, YYYY"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "publishedAt",
                  "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "thumbnailImage",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 80
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 120
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": [
                        (v6/*: any*/)
                      ],
                      "storageKey": "cropped(height:80,width:120)"
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
      "storageKey": "articlesConnection(first:4,inEditorialFeed:true,sort:\"PUBLISHED_AT_DESC\")"
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
      "name": "collections",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistHighlights",
      "kind": "LinkedField",
      "name": "highlights",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "displayOnPartnerProfile",
              "value": true
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 10
            },
            {
              "kind": "Variable",
              "name": "partnerCategory",
              "variableName": "partnerCategory"
            },
            {
              "kind": "Literal",
              "name": "representedBy",
              "value": true
            }
          ],
          "concreteType": "PartnerArtistConnection",
          "kind": "LinkedField",
          "name": "partnersConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerArtistEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Partner",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "PartnerCategory",
                      "kind": "LinkedField",
                      "name": "categories",
                      "plural": true,
                      "selections": (v5/*: any*/),
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
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistInsight",
      "kind": "LinkedField",
      "name": "insights",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistBio_bio"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CurrentEvent_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MarketInsights_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Genes_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorksForSaleRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignButton_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistTopWorksRail_artist"
    }
  ],
  "type": "Artist"
};
})();
(node as any).hash = '21d56df7032a5a7852fb99bc4e4f0dcf';
export default node;
