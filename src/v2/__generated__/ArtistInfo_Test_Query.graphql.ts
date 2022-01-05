/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistInfo_Test_QueryVariables = {};
export type ArtistInfo_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistInfo_artist">;
    } | null;
};
export type ArtistInfo_Test_QueryRawResponse = {
    readonly artist: ({
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly image: ({
            readonly cropped: ({
                readonly src: string;
                readonly srcSet: string;
            }) | null;
        }) | null;
        readonly formatted_nationality_and_birthday: string | null;
        readonly counts: ({
            readonly partner_shows: number | null;
            readonly follows: number | null;
        }) | null;
        readonly exhibition_highlights: ReadonlyArray<({
            readonly partner: ({
                readonly __typename: "ExternalPartner";
                readonly id: string | null;
                readonly name: string | null;
            } | {
                readonly __typename: "Partner";
                readonly id: string | null;
                readonly name: string | null;
            } | {
                readonly __typename: string | null;
                readonly id: string | null;
            }) | null;
            readonly name: string | null;
            readonly start_at: string | null;
            readonly cover_image: ({
                readonly cropped: ({
                    readonly url: string;
                }) | null;
            }) | null;
            readonly city: string | null;
            readonly id: string | null;
        }) | null> | null;
        readonly collections: ReadonlyArray<string | null> | null;
        readonly highlights: ({
            readonly partnersConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly __typename: "Partner";
                        readonly id: string | null;
                        readonly categories: ReadonlyArray<({
                            readonly slug: string;
                            readonly id: string | null;
                        }) | null> | null;
                    }) | null;
                    readonly id: string | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly auctionResultsConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly __typename: "AuctionResult";
                    readonly id: string | null;
                    readonly price_realized: ({
                        readonly display: string | null;
                    }) | null;
                    readonly organization: string | null;
                    readonly sale_date: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly biographyBlurb: ({
            readonly credit: string | null;
            readonly partnerID: string | null;
            readonly text: string | null;
        }) | null;
        readonly id: string;
        readonly is_followed: boolean | null;
    }) | null;
};
export type ArtistInfo_Test_Query = {
    readonly response: ArtistInfo_Test_QueryResponse;
    readonly variables: ArtistInfo_Test_QueryVariables;
    readonly rawResponse: ArtistInfo_Test_QueryRawResponse;
};



/*
query ArtistInfo_Test_Query {
  artist(id: "banksy") {
    ...ArtistInfo_artist
    id
  }
}

fragment ArtistBio_bio on Artist {
  biographyBlurb(format: HTML, partnerBio: false) {
    credit
    partnerID
    text
  }
}

fragment ArtistInfo_artist on Artist {
  internalID
  slug
  name
  href
  image {
    cropped(width: 45, height: 45) {
      src
      srcSet
    }
  }
  formatted_nationality_and_birthday: formattedNationalityAndBirthday
  counts {
    partner_shows: partnerShows
  }
  exhibition_highlights: exhibitionHighlights(size: 3) {
    ...SelectedExhibitions_exhibitions
    id
  }
  collections
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          __typename
          id
        }
        id
      }
    }
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        __typename
        id
      }
    }
  }
  ...ArtistBio_bio
  ...ArtistMarketInsights_artist
  ...FollowArtistButton_artist
  biographyBlurb(format: HTML, partnerBio: false) {
    text
  }
}

fragment ArtistMarketInsights_artist on Artist {
  collections
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0.0a")
        }
        organization
        sale_date: saleDate(format: "YYYY")
        id
      }
    }
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment SelectedExhibitions_exhibitions on Show {
  partner {
    __typename
    ... on ExternalPartner {
      name
      id
    }
    ... on Partner {
      name
    }
    ... on Node {
      id
    }
  }
  name
  start_at: startAt(format: "YYYY")
  cover_image: coverImage {
    cropped(width: 800, height: 600) {
      url
    }
  }
  city
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "banksy"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v2/*: any*/)
],
v6 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "YYYY"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistInfo_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistInfo_artist"
          }
        ],
        "storageKey": "artist(id:\"banksy\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistInfo_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
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
            "alias": "formatted_nationality_and_birthday",
            "args": null,
            "kind": "ScalarField",
            "name": "formattedNationalityAndBirthday",
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
                "name": "follows",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "exhibition_highlights",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 3
              }
            ],
            "concreteType": "Show",
            "kind": "LinkedField",
            "name": "exhibitionHighlights",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": (v5/*: any*/),
                    "type": "ExternalPartner"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v5/*: any*/),
                    "type": "Partner"
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": "start_at",
                "args": (v6/*: any*/),
                "kind": "ScalarField",
                "name": "startAt",
                "storageKey": "startAt(format:\"YYYY\")"
              },
              {
                "alias": "cover_image",
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
                        "value": 600
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 800
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
                    "storageKey": "cropped(height:600,width:800)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "exhibitionHighlights(size:3)"
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
                    "kind": "Literal",
                    "name": "partnerCategory",
                    "value": [
                      "blue-chip",
                      "top-established",
                      "top-emerging"
                    ]
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
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerCategory",
                            "kind": "LinkedField",
                            "name": "categories",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
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
              },
              {
                "kind": "Literal",
                "name": "recordsTrusted",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PRICE_AND_DATE_DESC"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "0.0a"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": "display(format:\"0.0a\")"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "organization",
                        "storageKey": null
                      },
                      {
                        "alias": "sale_date",
                        "args": (v6/*: any*/),
                        "kind": "ScalarField",
                        "name": "saleDate",
                        "storageKey": "saleDate(format:\"YYYY\")"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
          },
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
                "value": false
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
                "name": "credit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
          },
          (v4/*: any*/),
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"banksy\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ArtistInfo_Test_Query",
    "operationKind": "query",
    "text": "query ArtistInfo_Test_Query {\n  artist(id: \"banksy\") {\n    ...ArtistInfo_artist\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n\nfragment ArtistInfo_artist on Artist {\n  internalID\n  slug\n  name\n  href\n  image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  formatted_nationality_and_birthday: formattedNationalityAndBirthday\n  counts {\n    partner_shows: partnerShows\n  }\n  exhibition_highlights: exhibitionHighlights(size: 3) {\n    ...SelectedExhibitions_exhibitions\n    id\n  }\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          __typename\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        __typename\n        id\n      }\n    }\n  }\n  ...ArtistBio_bio\n  ...ArtistMarketInsights_artist\n  ...FollowArtistButton_artist\n  biographyBlurb(format: HTML, partnerBio: false) {\n    text\n  }\n}\n\nfragment ArtistMarketInsights_artist on Artist {\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment SelectedExhibitions_exhibitions on Show {\n  partner {\n    __typename\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      id\n    }\n  }\n  name\n  start_at: startAt(format: \"YYYY\")\n  cover_image: coverImage {\n    cropped(width: 800, height: 600) {\n      url\n    }\n  }\n  city\n}\n"
  }
};
})();
(node as any).hash = 'c949c558fa41a1e6dfee249dbb233c6b';
export default node;
