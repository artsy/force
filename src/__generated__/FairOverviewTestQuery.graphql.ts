/**
 * @generated SignedSource<<c9659f7c73ec88f43d12980443c260d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOverviewTestQuery$variables = Record<PropertyKey, never>;
export type FairOverviewTestQuery$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOverview_fair">;
  } | null | undefined;
};
export type FairOverviewTestQuery = {
  response: FairOverviewTestQuery$data;
  variables: FairOverviewTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "YYYY-MM-DD"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOverviewTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOverview_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOverviewTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": "description",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "PLAIN"
              }
            ],
            "kind": "ScalarField",
            "name": "about",
            "storageKey": "about(format:\"PLAIN\")"
          },
          {
            "alias": "structuredDataStartAt",
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": "startAt(format:\"YYYY-MM-DD\")"
          },
          {
            "alias": "structuredDataEndAt",
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": "endAt(format:\"YYYY-MM-DD\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "address",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "address2",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "summary",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "postalCode",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FairOrganizer",
            "kind": "LinkedField",
            "name": "organizer",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "website",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "structuredDataImage",
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
                    "value": 900
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
                    "value": 1200
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": "cropped(height:900,version:[\"larger\",\"large\"],width:1200)"
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
                "value": 6
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "vertical",
                        "storageKey": null
                      },
                      (v8/*: any*/),
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
                        "name": "byline",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
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
                                "value": 334
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
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 5
              }
            ],
            "concreteType": "MarketingCollection",
            "kind": "LinkedField",
            "name": "marketingCollections",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v9/*: any*/),
              (v8/*: any*/),
              {
                "alias": "artworks",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 3
                  }
                ],
                "concreteType": "FilterArtworksConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FilterArtworksCounts",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "total",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
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
                                    "name": "version",
                                    "value": "larger"
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:\"larger\")"
                              }
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": "artworksConnection(first:3)"
              }
            ],
            "storageKey": "marketingCollections(size:5)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "about",
            "storageKey": "about(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEvergreen",
            "storageKey": null
          },
          (v9/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "a8c6082be77c006af79ab3c11e1a7342",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.about": (v10/*: any*/),
        "fair.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "fair.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "fair.articlesConnection.edges.__typename": (v11/*: any*/),
        "fair.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "fair.articlesConnection.edges.node.byline": (v10/*: any*/),
        "fair.articlesConnection.edges.node.href": (v10/*: any*/),
        "fair.articlesConnection.edges.node.id": (v12/*: any*/),
        "fair.articlesConnection.edges.node.internalID": (v12/*: any*/),
        "fair.articlesConnection.edges.node.publishedAt": (v10/*: any*/),
        "fair.articlesConnection.edges.node.slug": (v10/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage": (v13/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped": (v14/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.height": (v15/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.src": (v11/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v11/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.width": (v15/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailTitle": (v10/*: any*/),
        "fair.articlesConnection.edges.node.title": (v10/*: any*/),
        "fair.articlesConnection.edges.node.vertical": (v10/*: any*/),
        "fair.articlesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "fair.description": (v10/*: any*/),
        "fair.endAt": (v10/*: any*/),
        "fair.href": (v10/*: any*/),
        "fair.id": (v12/*: any*/),
        "fair.isEvergreen": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "fair.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "fair.location.address": (v10/*: any*/),
        "fair.location.address2": (v10/*: any*/),
        "fair.location.city": (v10/*: any*/),
        "fair.location.country": (v10/*: any*/),
        "fair.location.id": (v12/*: any*/),
        "fair.location.postalCode": (v10/*: any*/),
        "fair.location.state": (v10/*: any*/),
        "fair.location.summary": (v10/*: any*/),
        "fair.marketingCollections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "MarketingCollection"
        },
        "fair.marketingCollections.artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "fair.marketingCollections.artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "fair.marketingCollections.artworks.counts.total": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "fair.marketingCollections.artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "fair.marketingCollections.artworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "fair.marketingCollections.artworks.edges.node.id": (v12/*: any*/),
        "fair.marketingCollections.artworks.edges.node.image": (v13/*: any*/),
        "fair.marketingCollections.artworks.edges.node.image.url": (v10/*: any*/),
        "fair.marketingCollections.artworks.id": (v12/*: any*/),
        "fair.marketingCollections.id": (v12/*: any*/),
        "fair.marketingCollections.slug": (v11/*: any*/),
        "fair.marketingCollections.title": (v11/*: any*/),
        "fair.name": (v10/*: any*/),
        "fair.organizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fair.organizer.id": (v12/*: any*/),
        "fair.organizer.name": (v10/*: any*/),
        "fair.organizer.website": (v10/*: any*/),
        "fair.slug": (v12/*: any*/),
        "fair.structuredDataEndAt": (v10/*: any*/),
        "fair.structuredDataImage": (v13/*: any*/),
        "fair.structuredDataImage.cropped": (v14/*: any*/),
        "fair.structuredDataImage.cropped.height": (v15/*: any*/),
        "fair.structuredDataImage.cropped.src": (v11/*: any*/),
        "fair.structuredDataImage.cropped.width": (v15/*: any*/),
        "fair.structuredDataStartAt": (v10/*: any*/)
      }
    },
    "name": "FairOverviewTestQuery",
    "operationKind": "query",
    "text": "query FairOverviewTestQuery {\n  fair(id: \"example\") {\n    ...FairOverview_fair\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairAbout_fair on Fair {\n  ...FairTimer_fair\n  about(format: HTML)\n  isEvergreen\n}\n\nfragment FairCollection_collection on MarketingCollection {\n  id\n  slug\n  title\n  artworks: artworksConnection(first: 3) {\n    counts {\n      total\n    }\n    edges {\n      node {\n        image {\n          url(version: \"larger\")\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment FairCollections_fair on Fair {\n  marketingCollections(size: 5) {\n    id\n    slug\n    ...FairCollection_collection\n  }\n}\n\nfragment FairEditorialRailArticles_fair on Fair {\n  href\n  articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        slug\n        id\n      }\n    }\n  }\n}\n\nfragment FairOverview_fair on Fair {\n  ...FairStructuredData_fair\n  ...FairEditorialRailArticles_fair\n  ...FairCollections_fair\n  ...FairAbout_fair\n  slug\n  articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {\n    edges {\n      __typename\n    }\n  }\n  marketingCollections(size: 5) {\n    id\n  }\n}\n\nfragment FairStructuredData_fair on Fair {\n  name\n  href\n  description: about(format: PLAIN)\n  structuredDataStartAt: startAt(format: \"YYYY-MM-DD\")\n  structuredDataEndAt: endAt(format: \"YYYY-MM-DD\")\n  location {\n    address\n    address2\n    city\n    state\n    country\n    summary\n    postalCode\n    id\n  }\n  organizer {\n    name\n    website\n    id\n  }\n  structuredDataImage: image {\n    cropped(width: 1200, height: 900, version: [\"larger\", \"large\"]) {\n      src\n      width\n      height\n    }\n  }\n}\n\nfragment FairTimer_fair on Fair {\n  endAt\n}\n"
  }
};
})();

(node as any).hash = "cbc4e332d95abd44542a3077a4292343";

export default node;
