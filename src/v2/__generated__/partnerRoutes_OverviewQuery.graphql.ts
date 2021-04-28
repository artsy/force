/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_OverviewQueryVariables = {
    partnerId: string;
};
export type partnerRoutes_OverviewQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"Overview_partner">;
    } | null;
};
export type partnerRoutes_OverviewQuery = {
    readonly response: partnerRoutes_OverviewQueryResponse;
    readonly variables: partnerRoutes_OverviewQueryVariables;
};



/*
query partnerRoutes_OverviewQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
    ...Overview_partner
    id
  }
}

fragment ArticleCard_article on Article {
  channelID
  thumbnailTitle
  href
  author {
    name
    id
  }
  contributingAuthors {
    name
    id
  }
  thumbnailImage {
    medium: cropped(width: 357, height: 320) {
      width
      height
      src
      srcSet
    }
  }
}

fragment ArticlesRail_articles on ArticleEdge {
  node {
    internalID
    ...ArticleCard_article
    id
  }
}

fragment ArtistsRail_partner on Partner {
  slug
  profileArtistsLayout
  ...PartnerArtists_partner
}

fragment Overview_partner on Partner {
  slug
  displayArtistsSection
  ...ArtistsRail_partner
  articlesConnection(first: 10) {
    totalCount
    edges {
      ...ArticlesRail_articles
      cursor
      node {
        __typename
        id
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment PartnerArtistItem_artist on Artist {
  name
  slug
}

fragment PartnerArtistList_artists on ArtistPartnerEdge {
  representedBy
  counts {
    artworks
  }
  node {
    internalID
    ...PartnerArtistItem_artist
    id
  }
}

fragment PartnerArtists_partner on Partner {
  slug
  distinguishRepresentedArtists
  allArtistsConnection(displayOnPartnerProfile: true, hasNotRepresentedArtistWithPublishedArtworks: true) {
    edges {
      ...PartnerArtistList_artists
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v7 = [
  (v4/*: any*/),
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_OverviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Overview_partner"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "partnerRoutes_OverviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayArtistsSection",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "profileArtistsLayout",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "distinguishRepresentedArtists",
            "storageKey": null
          },
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
                "name": "hasNotRepresentedArtistWithPublishedArtworks",
                "value": true
              }
            ],
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "allArtistsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistPartnerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "representedBy",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerArtistCounts",
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
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v2/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "allArtistsConnection(displayOnPartnerProfile:true,hasNotRepresentedArtistWithPublishedArtworks:true)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
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
                        "name": "channelID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "thumbnailTitle",
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
                        "concreteType": "Author",
                        "kind": "LinkedField",
                        "name": "author",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Author",
                        "kind": "LinkedField",
                        "name": "contributingAuthors",
                        "plural": true,
                        "selections": (v7/*: any*/),
                        "storageKey": null
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
                            "alias": "medium",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 320
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 357
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
                            "storageKey": "cropped(height:320,width:357)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:10)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ArticlesQuery_articlesConnection",
            "kind": "LinkedHandle",
            "name": "articlesConnection"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_OverviewQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_OverviewQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...Overview_partner\n    id\n  }\n}\n\nfragment ArticleCard_article on Article {\n  channelID\n  thumbnailTitle\n  href\n  author {\n    name\n    id\n  }\n  contributingAuthors {\n    name\n    id\n  }\n  thumbnailImage {\n    medium: cropped(width: 357, height: 320) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArticlesRail_articles on ArticleEdge {\n  node {\n    internalID\n    ...ArticleCard_article\n    id\n  }\n}\n\nfragment ArtistsRail_partner on Partner {\n  slug\n  profileArtistsLayout\n  ...PartnerArtists_partner\n}\n\nfragment Overview_partner on Partner {\n  slug\n  displayArtistsSection\n  ...ArtistsRail_partner\n  articlesConnection(first: 10) {\n    totalCount\n    edges {\n      ...ArticlesRail_articles\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment PartnerArtistItem_artist on Artist {\n  name\n  slug\n}\n\nfragment PartnerArtistList_artists on ArtistPartnerEdge {\n  representedBy\n  counts {\n    artworks\n  }\n  node {\n    internalID\n    ...PartnerArtistItem_artist\n    id\n  }\n}\n\nfragment PartnerArtists_partner on Partner {\n  slug\n  distinguishRepresentedArtists\n  allArtistsConnection(displayOnPartnerProfile: true, hasNotRepresentedArtistWithPublishedArtworks: true) {\n    edges {\n      ...PartnerArtistList_artists\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '43c49ea345dc3fc5f0b2e85bba1d3daa';
export default node;
