/**
 * @generated SignedSource<<388e3a8ded6ae2b7c6b57ea7e198a838>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerDedicatedArticlesQuery$variables = {
  id: string;
  first?: number | null;
  page?: number | null;
};
export type FairOrganizerDedicatedArticlesQuery$data = {
  readonly fairOrganizer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerDedicatedArticles_fairOrganizer">;
  } | null;
};
export type FairOrganizerDedicatedArticlesQuery = {
  variables: FairOrganizerDedicatedArticlesQuery$variables;
  response: FairOrganizerDedicatedArticlesQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v4 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v5 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v13 = [
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
  (v11/*: any*/),
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerDedicatedArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "FairOrganizerDedicatedArticles_fairOrganizer"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "FairOrganizerDedicatedArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v4/*: any*/),
              (v5/*: any*/),
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
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
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
                      (v10/*: any*/),
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
                            "selections": (v13/*: any*/),
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
                            "selections": (v13/*: any*/),
                            "storageKey": "cropped(height:240,width:325)"
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
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
                        "name": "height",
                        "value": 30
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 30
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": "resized(height:30,version:\"square\",width:30)"
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c89d9e89a9e595855113dc6c5516f4e6",
    "id": null,
    "metadata": {},
    "name": "FairOrganizerDedicatedArticlesQuery",
    "operationKind": "query",
    "text": "query FairOrganizerDedicatedArticlesQuery(\n  $id: String!\n  $first: Int\n  $page: Int\n) {\n  fairOrganizer(id: $id) {\n    ...FairOrganizerDedicatedArticles_fairOrganizer_4D1OJz\n    id\n  }\n}\n\nfragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    image {\n      resized(width: 30, height: 30, version: \"square\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairEditorialItemLink_article on Article {\n  internalID\n  slug\n  title\n  href\n  publishedAt(format: \"MMMM D, YYYY\")\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  title\n  publishedAt(format: \"MMMM D, YYYY\")\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  ...FairEditorialItemLink_article\n}\n\nfragment FairOrganizerDedicatedArticles_fairOrganizer_4D1OJz on FairOrganizer {\n  slug\n  name\n  articlesConnection(first: $first, page: $page, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        id\n        ...FairEditorialItem_article\n      }\n    }\n  }\n  ...DedicatedArticlesBreadcrumbs_fairOrganizer\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d5f5fecdb00cb8621f33015d572702a";

export default node;
