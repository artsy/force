/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairEditorialRailArticles_Test_QueryVariables = {};
export type FairEditorialRailArticles_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairEditorialRailArticles_fair">;
    } | null;
};
export type FairEditorialRailArticles_Test_Query = {
    readonly response: FairEditorialRailArticles_Test_QueryResponse;
    readonly variables: FairEditorialRailArticles_Test_QueryVariables;
};



/*
query FairEditorialRailArticles_Test_Query {
  fair(id: "test") {
    ...FairEditorialRailArticles_fair
    id
  }
}

fragment FairEditorialItemLink_article on Article {
  internalID
  slug
  title
  href
  publishedAt(format: "MMMM D, YYYY")
}

fragment FairEditorialItem_article on Article {
  id
  title
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
  ...FairEditorialItemLink_article
}

fragment FairEditorialRailArticles_fair on Fair {
  articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
    edges {
      node {
        id
        ...FairEditorialItem_article
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
v3 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairEditorialRailArticles_Test_Query",
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
            "name": "FairEditorialRailArticles_fair"
          }
        ],
        "storageKey": "fair(id:\"test\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairEditorialRailArticles_Test_Query",
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
                      (v1/*: any*/),
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
                            "selections": (v2/*: any*/),
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
                            "selections": (v2/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
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
            "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": "fair(id:\"test\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection": {
          "type": "ArticleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.edges": {
          "type": "ArticleEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "fair.articlesConnection.edges.node": {
          "type": "Article",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.edges.node.id": (v3/*: any*/),
        "fair.articlesConnection.edges.node.title": (v4/*: any*/),
        "fair.articlesConnection.edges.node.publishedAt": (v4/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailTitle": (v4/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.articlesConnection.edges.node.thumbnailImage.large": (v5/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.small": (v5/*: any*/),
        "fair.articlesConnection.edges.node.internalID": (v3/*: any*/),
        "fair.articlesConnection.edges.node.slug": (v4/*: any*/),
        "fair.articlesConnection.edges.node.href": (v4/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.width": (v6/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.height": (v6/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.src": (v7/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.large.srcSet": (v7/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.small.width": (v6/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.small.height": (v6/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.small.src": (v7/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.small.srcSet": (v7/*: any*/)
      }
    },
    "name": "FairEditorialRailArticles_Test_Query",
    "operationKind": "query",
    "text": "query FairEditorialRailArticles_Test_Query {\n  fair(id: \"test\") {\n    ...FairEditorialRailArticles_fair\n    id\n  }\n}\n\nfragment FairEditorialItemLink_article on Article {\n  internalID\n  slug\n  title\n  href\n  publishedAt(format: \"MMMM D, YYYY\")\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  title\n  publishedAt(format: \"MMMM D, YYYY\")\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  ...FairEditorialItemLink_article\n}\n\nfragment FairEditorialRailArticles_fair on Fair {\n  articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        id\n        ...FairEditorialItem_article\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3e900f3085b2c69ccb21d11590d9c230';
export default node;
