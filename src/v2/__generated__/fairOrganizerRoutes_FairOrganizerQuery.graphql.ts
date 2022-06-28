/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairOrganizerRoutes_FairOrganizerQueryVariables = {
    slug: string;
};
export type fairOrganizerRoutes_FairOrganizerQueryResponse = {
    readonly fairOrganizer: {
        readonly profile: {
            readonly __typename: string;
        } | null;
        readonly runningFairs: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly href: string | null;
                    readonly profile: {
                        readonly __typename: string;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
    } | null;
};
export type fairOrganizerRoutes_FairOrganizerQuery = {
    readonly response: fairOrganizerRoutes_FairOrganizerQueryResponse;
    readonly variables: fairOrganizerRoutes_FairOrganizerQueryVariables;
};



/*
query fairOrganizerRoutes_FairOrganizerQuery(
  $slug: String!
) {
  fairOrganizer(id: $slug) @principalField {
    profile {
      __typename
      id
    }
    runningFairs: fairsConnection(first: 1, status: RUNNING, sort: START_AT_DESC) {
      edges {
        node {
          href
          profile {
            __typename
            id
          }
          id
        }
      }
    }
    ...FairOrganizerApp_fairOrganizer
    id
  }
}

fragment CellArticle_article on Article {
  vertical
  title
  thumbnailTitle
  byline
  href
  publishedAt(format: "MMM D, YYYY")
  thumbnailImage {
    cropped(width: 445, height: 334) {
      width
      height
      src
      srcSet
    }
  }
}

fragment FairOrganizerApp_fairOrganizer on FairOrganizer {
  name
  slug
  description: about(format: PLAIN)
  profile {
    image {
      url(version: "wide")
    }
    id
  }
  ...FairOrganizerPastEventsRail_fairOrganizer
  ...FairOrganizerHeaderImage_fairOrganizer
  ...FairOrganizerHeader_fairOrganizer
  ...FairOrganizerLatestArticles_fairOrganizer
}

fragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {
  slug
  name
  profile {
    id
    internalID
    isFollowed
  }
}

fragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {
  name
  profile {
    icon {
      desktop: cropped(width: 80, height: 80, version: "square140") {
        src
        srcSet
        size: width
      }
      mobile: cropped(width: 60, height: 60, version: "square140") {
        src
        srcSet
        size: width
      }
    }
    id
  }
}

fragment FairOrganizerHeaderImage_fairOrganizer on FairOrganizer {
  profile {
    image {
      url(version: "wide")
    }
    id
  }
}

fragment FairOrganizerHeader_fairOrganizer on FairOrganizer {
  name
  fairsConnection(first: 1, sort: START_AT_DESC) {
    edges {
      node {
        href
        startAt
        exhibitionPeriod
        id
      }
    }
  }
  ...FairOrganizerHeaderIcon_fairOrganizer
  ...FairOrganizerFollowButton_fairOrganizer
  ...FairOrganizerInfo_fairOrganizer
}

fragment FairOrganizerInfo_fairOrganizer on FairOrganizer {
  about(format: HTML)
}

fragment FairOrganizerLatestArticles_fairOrganizer on FairOrganizer {
  name
  slug
  articlesConnection(first: 7, sort: PUBLISHED_AT_DESC) {
    totalCount
    edges {
      node {
        ...CellArticle_article
        internalID
        id
      }
    }
  }
}

fragment FairOrganizerPastEventRailCell_fair on Fair {
  slug
  name
  image {
    cropped(width: 325, height: 244) {
      width
      height
      src
      srcSet
    }
  }
}

fragment FairOrganizerPastEventsRail_fairOrganizer on FairOrganizer {
  pastFairs: fairsConnection(first: 20, sort: START_AT_DESC, status: CLOSED, hasFullFeature: true) {
    edges {
      node {
        id
        ...FairOrganizerPastEventRailCell_fair
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v5 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "status",
    "value": "RUNNING"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v12 = [
  (v10/*: any*/),
  (v11/*: any*/),
  {
    "alias": "size",
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v16 = [
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
  (v10/*: any*/),
  (v11/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fairOrganizerRoutes_FairOrganizerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": "runningFairs",
            "args": (v6/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:1,sort:\"START_AT_DESC\",status:\"RUNNING\")"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerApp_fairOrganizer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "fairOrganizerRoutes_FairOrganizerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v8/*: any*/),
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
                      (v9/*: any*/),
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
                    "selections": (v12/*: any*/),
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
                      (v9/*: any*/),
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
                    "selections": (v12/*: any*/),
                    "storageKey": "cropped(height:60,version:\"square140\",width:60)"
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/),
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
            "alias": "runningFairs",
            "args": (v6/*: any*/),
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
                        "concreteType": "Profile",
                        "kind": "LinkedField",
                        "name": "profile",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:1,sort:\"START_AT_DESC\",status:\"RUNNING\")"
          },
          (v14/*: any*/),
          (v15/*: any*/),
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
                      (v8/*: any*/),
                      (v15/*: any*/),
                      (v14/*: any*/),
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
                            "selections": (v16/*: any*/),
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
              (v4/*: any*/),
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
                      (v8/*: any*/)
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
                            "selections": (v16/*: any*/),
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v13/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:7,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1716403e0837a343feb4d7a99be0370c",
    "id": null,
    "metadata": {},
    "name": "fairOrganizerRoutes_FairOrganizerQuery",
    "operationKind": "query",
    "text": "query fairOrganizerRoutes_FairOrganizerQuery(\n  $slug: String!\n) {\n  fairOrganizer(id: $slug) @principalField {\n    profile {\n      __typename\n      id\n    }\n    runningFairs: fairsConnection(first: 1, status: RUNNING, sort: START_AT_DESC) {\n      edges {\n        node {\n          href\n          profile {\n            __typename\n            id\n          }\n          id\n        }\n      }\n    }\n    ...FairOrganizerApp_fairOrganizer\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerApp_fairOrganizer on FairOrganizer {\n  name\n  slug\n  description: about(format: PLAIN)\n  profile {\n    image {\n      url(version: \"wide\")\n    }\n    id\n  }\n  ...FairOrganizerPastEventsRail_fairOrganizer\n  ...FairOrganizerHeaderImage_fairOrganizer\n  ...FairOrganizerHeader_fairOrganizer\n  ...FairOrganizerLatestArticles_fairOrganizer\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n\nfragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {\n  name\n  profile {\n    icon {\n      desktop: cropped(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeaderImage_fairOrganizer on FairOrganizer {\n  profile {\n    image {\n      url(version: \"wide\")\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeader_fairOrganizer on FairOrganizer {\n  name\n  fairsConnection(first: 1, sort: START_AT_DESC) {\n    edges {\n      node {\n        href\n        startAt\n        exhibitionPeriod\n        id\n      }\n    }\n  }\n  ...FairOrganizerHeaderIcon_fairOrganizer\n  ...FairOrganizerFollowButton_fairOrganizer\n  ...FairOrganizerInfo_fairOrganizer\n}\n\nfragment FairOrganizerInfo_fairOrganizer on FairOrganizer {\n  about(format: HTML)\n}\n\nfragment FairOrganizerLatestArticles_fairOrganizer on FairOrganizer {\n  name\n  slug\n  articlesConnection(first: 7, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment FairOrganizerPastEventRailCell_fair on Fair {\n  slug\n  name\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerPastEventsRail_fairOrganizer on FairOrganizer {\n  pastFairs: fairsConnection(first: 20, sort: START_AT_DESC, status: CLOSED, hasFullFeature: true) {\n    edges {\n      node {\n        id\n        ...FairOrganizerPastEventRailCell_fair\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '172f34fcb252bada05202fc18b74a2a0';
export default node;
