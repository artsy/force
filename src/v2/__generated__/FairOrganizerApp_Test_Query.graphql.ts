/**
 * @generated SignedSource<<98469ed70e40502db03eb8062830fb30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_Test_Query$variables = {};
export type FairOrganizerApp_Test_Query$data = {
  readonly fairOrganizer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
  } | null;
};
export type FairOrganizerApp_Test_Query = {
  variables: FairOrganizerApp_Test_Query$variables;
  response: FairOrganizerApp_Test_Query$data;
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
  "kind": "Literal",
  "name": "version",
  "value": "square140"
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
  "name": "srcSet",
  "storageKey": null
},
v7 = [
  (v5/*: any*/),
  (v6/*: any*/),
  {
    "alias": "size",
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v9 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v10 = {
  "kind": "Literal",
  "name": "width",
  "value": 325
},
v11 = [
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
  (v5/*: any*/),
  (v6/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FairConnection"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "FairEdge"
},
v21 = {
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
                    "alias": "desktop",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 80
                      },
                      (v4/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": "cropped(height:80,version:\"square140\",width:80)"
                  },
                  {
                    "alias": "mobile",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 60
                      },
                      (v4/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 60
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": "cropped(height:60,version:\"square140\",width:60)"
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/),
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
              (v9/*: any*/),
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
                              (v10/*: any*/)
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v11/*: any*/),
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
              (v9/*: any*/)
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
                      (v12/*: any*/),
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMMM D, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMMM D, YYYY\")"
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
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "thumbnailImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "large",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 720
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 670
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v11/*: any*/),
                            "storageKey": "cropped(height:720,width:670)"
                          },
                          {
                            "alias": "small",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 240
                              },
                              (v10/*: any*/)
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v11/*: any*/),
                            "storageKey": "cropped(height:240,width:325)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v2/*: any*/),
                      (v12/*: any*/)
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
    "cacheID": "82555bf5c74b44d3c22ba4de189ff67d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fairOrganizer.about": (v13/*: any*/),
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
        "fairOrganizer.articlesConnection.edges.node.href": (v13/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.id": (v14/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.internalID": (v14/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.publishedAt": (v13/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.slug": (v13/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage": (v15/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large": (v16/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.height": (v17/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.src": (v18/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.srcSet": (v18/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.large.width": (v17/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small": (v16/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.height": (v17/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.src": (v18/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.srcSet": (v18/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailImage.small.width": (v17/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.thumbnailTitle": (v13/*: any*/),
        "fairOrganizer.articlesConnection.edges.node.title": (v13/*: any*/),
        "fairOrganizer.articlesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "fairOrganizer.fairsConnection": (v19/*: any*/),
        "fairOrganizer.fairsConnection.edges": (v20/*: any*/),
        "fairOrganizer.fairsConnection.edges.node": (v21/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.exhibitionPeriod": (v13/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.href": (v13/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.id": (v14/*: any*/),
        "fairOrganizer.fairsConnection.edges.node.startAt": (v13/*: any*/),
        "fairOrganizer.id": (v14/*: any*/),
        "fairOrganizer.name": (v13/*: any*/),
        "fairOrganizer.pastFairs": (v19/*: any*/),
        "fairOrganizer.pastFairs.edges": (v20/*: any*/),
        "fairOrganizer.pastFairs.edges.node": (v21/*: any*/),
        "fairOrganizer.pastFairs.edges.node.id": (v14/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image": (v15/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped": (v16/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.height": (v17/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.src": (v18/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.srcSet": (v18/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.width": (v17/*: any*/),
        "fairOrganizer.pastFairs.edges.node.name": (v13/*: any*/),
        "fairOrganizer.pastFairs.edges.node.slug": (v14/*: any*/),
        "fairOrganizer.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fairOrganizer.profile.icon": (v15/*: any*/),
        "fairOrganizer.profile.icon.desktop": (v16/*: any*/),
        "fairOrganizer.profile.icon.desktop.size": (v17/*: any*/),
        "fairOrganizer.profile.icon.desktop.src": (v18/*: any*/),
        "fairOrganizer.profile.icon.desktop.srcSet": (v18/*: any*/),
        "fairOrganizer.profile.icon.mobile": (v16/*: any*/),
        "fairOrganizer.profile.icon.mobile.size": (v17/*: any*/),
        "fairOrganizer.profile.icon.mobile.src": (v18/*: any*/),
        "fairOrganizer.profile.icon.mobile.srcSet": (v18/*: any*/),
        "fairOrganizer.profile.id": (v14/*: any*/),
        "fairOrganizer.profile.image": (v15/*: any*/),
        "fairOrganizer.profile.image.url": (v13/*: any*/),
        "fairOrganizer.profile.internalID": (v14/*: any*/),
        "fairOrganizer.profile.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "fairOrganizer.slug": (v14/*: any*/)
      }
    },
    "name": "FairOrganizerApp_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerApp_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...FairOrganizerApp_fairOrganizer\n    id\n  }\n}\n\nfragment FairEditorialItemLink_article on Article {\n  internalID\n  slug\n  title\n  href\n  publishedAt(format: \"MMMM D, YYYY\")\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  title\n  publishedAt(format: \"MMMM D, YYYY\")\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  ...FairEditorialItemLink_article\n}\n\nfragment FairOrganizerApp_fairOrganizer on FairOrganizer {\n  name\n  slug\n  about(format: HTML)\n  profile {\n    image {\n      url(version: \"wide\")\n    }\n    id\n  }\n  ...FairOrganizerPastEventsRail_fairOrganizer\n  ...FairOrganizerHeaderImage_fairOrganizer\n  ...FairOrganizerHeader_fairOrganizer\n  ...FairOrganizerLatestArticles_fairOrganizer\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n\nfragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {\n  name\n  profile {\n    icon {\n      desktop: cropped(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeaderImage_fairOrganizer on FairOrganizer {\n  profile {\n    image {\n      url(version: \"wide\")\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeader_fairOrganizer on FairOrganizer {\n  name\n  fairsConnection(first: 1, sort: START_AT_DESC) {\n    edges {\n      node {\n        href\n        startAt\n        exhibitionPeriod\n        id\n      }\n    }\n  }\n  ...FairOrganizerHeaderIcon_fairOrganizer\n  ...FairOrganizerFollowButton_fairOrganizer\n  ...FairOrganizerInfo_fairOrganizer\n}\n\nfragment FairOrganizerInfo_fairOrganizer on FairOrganizer {\n  about(format: HTML)\n}\n\nfragment FairOrganizerLatestArticles_fairOrganizer on FairOrganizer {\n  name\n  slug\n  articlesConnection(first: 7, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        id\n        ...FairEditorialItem_article\n      }\n    }\n  }\n}\n\nfragment FairOrganizerPastEventRailCell_fair on Fair {\n  slug\n  name\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerPastEventsRail_fairOrganizer on FairOrganizer {\n  pastFairs: fairsConnection(first: 20, sort: START_AT_DESC, status: CLOSED, hasFullFeature: true) {\n    edges {\n      node {\n        id\n        ...FairOrganizerPastEventRailCell_fair\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ad6f4a54abafbde7061ac08a7410afa";

export default node;
