/**
 * @generated SignedSource<<2c68dc197317d830a8c38c5a996145cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_Test_Query$variables = Record<PropertyKey, never>;
export type FairOrganizerApp_Test_Query$data = {
  readonly fairOrganizer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
  } | null | undefined;
};
export type FairOrganizerApp_Test_Query = {
  response: FairOrganizerApp_Test_Query$data;
  variables: FairOrganizerApp_Test_Query$variables;
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
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v6 = [
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FairConnection"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "FairEdge"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Fair"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerApp_fairOrganizer"
          }
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOrganizerApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
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
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
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
                        "value": "wide"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"wide\")"
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "large",
                          "square",
                          "square140"
                        ]
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:[\"large\",\"square\",\"square140\"])"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "pastFairs",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              },
              {
                "kind": "Literal",
                "name": "hasFullFeature",
                "value": true
              },
              (v5/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "CLOSED"
              }
            ],
            "concreteType": "FairConnection",
            "kind": "LinkedField",
            "name": "fairsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FairEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Fair",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/),
                      (v1/*: any*/),
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
                                "value": 244
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
                            "selections": (v6/*: any*/),
                            "storageKey": "cropped(height:244,width:325)"
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
            "storageKey": "fairsConnection(first:20,hasFullFeature:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              (v5/*: any*/)
            ],
            "concreteType": "FairConnection",
            "kind": "LinkedField",
            "name": "fairsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FairEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Fair",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:1,sort:\"START_AT_DESC\")"
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 7
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
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
                        "name": "byline",
                        "storageKey": null
                      },
                      (v7/*: any*/),
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
                            "selections": (v6/*: any*/),
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:7,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v3/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "84fc8dd4fc6cdbdb9911b289741c59af",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fairOrganizer.about": (v8/*: any*/),
        "fairOrganizer.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "fairOrganizer.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "fairOrganizer.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "fairOrganizer.articlesConnection.edges.node.byline": (v8/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.href": (v8/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.id": (v9/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.internalID": (v9/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.publishedAt": (v8/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage": (v10/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped": (v11/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.height": (v12/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.src": (v13/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v13/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.cropped.width": (v12/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailTitle": (v8/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.title": (v8/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.vertical": (v8/*: any*/),
        "fairOrganizer.articlesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "fairOrganizer.description": (v8/*: any*/),
        "fairOrganizer.fairsConnection": (v14/*: any*/),
        "fairOrganizer.fairsConnection.edges": (v15/*: any*/),
        "fairOrganizer.fairsConnection.edges.node": (v16/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.exhibitionPeriod": (v8/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.href": (v8/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.id": (v9/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.startAt": (v8/*: any*/),
        "fairOrganizer.id": (v9/*: any*/),
        "fairOrganizer.name": (v8/*: any*/),
        "fairOrganizer.pastFairs": (v14/*: any*/),
        "fairOrganizer.pastFairs.edges": (v15/*: any*/),
        "fairOrganizer.pastFairs.edges.node": (v16/*: any*/),
        "fairOrganizer.pastFairs.edges.node.id": (v9/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image": (v10/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped": (v11/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.height": (v12/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.src": (v13/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.srcSet": (v13/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.width": (v12/*: any*/),
        "fairOrganizer.pastFairs.edges.node.name": (v8/*: any*/),
        "fairOrganizer.pastFairs.edges.node.slug": (v9/*: any*/),
        "fairOrganizer.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fairOrganizer.profile.icon": (v10/*: any*/),
        "fairOrganizer.profile.icon.url": (v8/*: any*/),
        "fairOrganizer.profile.id": (v9/*: any*/),
        "fairOrganizer.profile.image": (v10/*: any*/),
        "fairOrganizer.profile.image.url": (v8/*: any*/),
        "fairOrganizer.profile.internalID": (v9/*: any*/),
        "fairOrganizer.profile.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "fairOrganizer.slug": (v9/*: any*/)
      }
    },
    "name": "FairOrganizerApp_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerApp_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...FairOrganizerApp_fairOrganizer\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerApp_fairOrganizer on FairOrganizer {\n  name\n  slug\n  description: about(format: PLAIN)\n  profile {\n    image {\n      url(version: \"wide\")\n    }\n    id\n  }\n  ...FairOrganizerPastEventsRail_fairOrganizer\n  ...FairOrganizerHeaderImage_fairOrganizer\n  ...FairOrganizerHeader_fairOrganizer\n  ...FairOrganizerLatestArticles_fairOrganizer\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n\nfragment FairOrganizerHeaderImage_fairOrganizer on FairOrganizer {\n  profile {\n    image {\n      url(version: \"wide\")\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeader_fairOrganizer on FairOrganizer {\n  name\n  fairsConnection(first: 1, sort: START_AT_DESC) {\n    edges {\n      node {\n        href\n        startAt\n        exhibitionPeriod\n        id\n      }\n    }\n  }\n  profile {\n    icon {\n      url(version: [\"large\", \"square\", \"square140\"])\n    }\n    id\n  }\n  ...FairOrganizerFollowButton_fairOrganizer\n  ...FairOrganizerInfo_fairOrganizer\n}\n\nfragment FairOrganizerInfo_fairOrganizer on FairOrganizer {\n  about(format: HTML)\n}\n\nfragment FairOrganizerLatestArticles_fairOrganizer on FairOrganizer {\n  name\n  slug\n  articlesConnection(first: 7, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment FairOrganizerPastEventRailCell_fair on Fair {\n  slug\n  name\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerPastEventsRail_fairOrganizer on FairOrganizer {\n  pastFairs: fairsConnection(first: 20, sort: START_AT_DESC, status: CLOSED, hasFullFeature: true) {\n    edges {\n      node {\n        id\n        ...FairOrganizerPastEventRailCell_fair\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ad6f4a54abafbde7061ac08a7410afa";

export default node;
