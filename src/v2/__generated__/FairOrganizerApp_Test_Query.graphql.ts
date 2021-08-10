/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_Test_QueryVariables = {};
export type FairOrganizerApp_Test_QueryResponse = {
    readonly fairOrganizer: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
    } | null;
    readonly pastFairs: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_pastFairs">;
    } | null;
};
export type FairOrganizerApp_Test_Query = {
    readonly response: FairOrganizerApp_Test_QueryResponse;
    readonly variables: FairOrganizerApp_Test_QueryVariables;
};



/*
query FairOrganizerApp_Test_Query {
  fairOrganizer(id: "example") {
    ...FairOrganizerApp_fairOrganizer
    id
  }
  pastFairs: fairsConnection(first: 20, fairOrganizerID: "example", sort: START_AT_DESC, status: CLOSED, hasFullFeature: true) {
    ...FairOrganizerApp_pastFairs
  }
}

fragment FairEditorialItem_article on Article {
  id
  internalID
  slug
  title
  href
  publishedAt(format: "MMMM D, YYYY")
  thumbnailTitle
  thumbnailImage {
    large: cropped(width: 670, height: 720) {
      width
      height
      src
      srcSet
    }
    small: cropped(width: 325, height: 240) {
      width
      height
      src
      srcSet
    }
  }
}

fragment FairHeaderImage_fair on Fair {
  image {
    url(version: "wide")
  }
}

fragment FairOrganizerApp_fairOrganizer on FairOrganizer {
  name
  fairs: fairsConnection(first: 1) {
    edges {
      node {
        ...FairHeaderImage_fair
        id
      }
    }
  }
  ...FairOrganizerHeader_fairOrganizer
  ...FairOrganizerLatestArticles_fairOrganizer
}

fragment FairOrganizerApp_pastFairs on FairConnection {
  ...FairOrganizerPastEventsRail_fairs
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
      desktop: cropped(width: 100, height: 100, version: "square140") {
        src
        srcSet
      }
      mobile: cropped(width: 60, height: 60, version: "square140") {
        src
        srcSet
      }
    }
    id
  }
}

fragment FairOrganizerHeader_fairOrganizer on FairOrganizer {
  name
  fairs: fairsConnection(first: 1) {
    edges {
      node {
        ...FairOrganizerTiming_fair
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
  articles: articlesConnection(first: 7) {
    edges {
      node {
        id
        ...FairEditorialItem_article
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

fragment FairOrganizerPastEventsRail_fairs on FairConnection {
  edges {
    node {
      id
      ...FairOrganizerPastEventRailCell_fair
    }
  }
}

fragment FairOrganizerTiming_fair on Fair {
  startAt
  exhibitionPeriod
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "fairOrganizerID",
    "value": "example"
  },
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
  {
    "kind": "Literal",
    "name": "sort",
    "value": "START_AT_DESC"
  },
  {
    "kind": "Literal",
    "name": "status",
    "value": "CLOSED"
  }
],
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
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = [
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
v11 = {
  "kind": "Literal",
  "name": "width",
  "value": 325
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
      },
      {
        "alias": "pastFairs",
        "args": (v1/*: any*/),
        "concreteType": "FairConnection",
        "kind": "LinkedField",
        "name": "fairsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerApp_pastFairs"
          }
        ],
        "storageKey": "fairsConnection(fairOrganizerID:\"example\",first:20,hasFullFeature:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
      }
    ],
    "type": "Query"
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
          (v2/*: any*/),
          {
            "alias": "fairs",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
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
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:1)"
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
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": "desktop",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 100
                      },
                      (v4/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 100
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": "cropped(height:100,version:\"square140\",width:100)"
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
              (v3/*: any*/),
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
          (v9/*: any*/),
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
            "alias": "articles",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 7
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
                      (v8/*: any*/),
                      (v9/*: any*/),
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
                        "name": "href",
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
                            "selections": (v10/*: any*/),
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
                              (v11/*: any*/)
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": "cropped(height:240,width:325)"
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
            "storageKey": "articlesConnection(first:7)"
          },
          (v3/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      },
      {
        "alias": "pastFairs",
        "args": (v1/*: any*/),
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
                  (v9/*: any*/),
                  (v2/*: any*/),
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
                          (v11/*: any*/)
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v10/*: any*/),
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
        "storageKey": "fairsConnection(fairOrganizerID:\"example\",first:20,hasFullFeature:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairOrganizerApp_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerApp_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...FairOrganizerApp_fairOrganizer\n    id\n  }\n  pastFairs: fairsConnection(first: 20, fairOrganizerID: \"example\", sort: START_AT_DESC, status: CLOSED, hasFullFeature: true) {\n    ...FairOrganizerApp_pastFairs\n  }\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  internalID\n  slug\n  title\n  href\n  publishedAt(format: \"MMMM D, YYYY\")\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairHeaderImage_fair on Fair {\n  image {\n    url(version: \"wide\")\n  }\n}\n\nfragment FairOrganizerApp_fairOrganizer on FairOrganizer {\n  name\n  fairs: fairsConnection(first: 1) {\n    edges {\n      node {\n        ...FairHeaderImage_fair\n        id\n      }\n    }\n  }\n  ...FairOrganizerHeader_fairOrganizer\n  ...FairOrganizerLatestArticles_fairOrganizer\n}\n\nfragment FairOrganizerApp_pastFairs on FairConnection {\n  ...FairOrganizerPastEventsRail_fairs\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n\nfragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {\n  name\n  profile {\n    icon {\n      desktop: cropped(width: 100, height: 100, version: \"square140\") {\n        src\n        srcSet\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeader_fairOrganizer on FairOrganizer {\n  name\n  fairs: fairsConnection(first: 1) {\n    edges {\n      node {\n        ...FairOrganizerTiming_fair\n        id\n      }\n    }\n  }\n  ...FairOrganizerHeaderIcon_fairOrganizer\n  ...FairOrganizerFollowButton_fairOrganizer\n  ...FairOrganizerInfo_fairOrganizer\n}\n\nfragment FairOrganizerInfo_fairOrganizer on FairOrganizer {\n  about(format: HTML)\n}\n\nfragment FairOrganizerLatestArticles_fairOrganizer on FairOrganizer {\n  name\n  articles: articlesConnection(first: 7) {\n    edges {\n      node {\n        id\n        ...FairEditorialItem_article\n      }\n    }\n  }\n}\n\nfragment FairOrganizerPastEventRailCell_fair on Fair {\n  slug\n  name\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerPastEventsRail_fairs on FairConnection {\n  edges {\n    node {\n      id\n      ...FairOrganizerPastEventRailCell_fair\n    }\n  }\n}\n\nfragment FairOrganizerTiming_fair on Fair {\n  startAt\n  exhibitionPeriod\n}\n"
  }
};
})();
(node as any).hash = 'c0e27cbaafb97e2f26e4637872f6ca7a';
export default node;
