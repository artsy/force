/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedMarketNews_Test_QueryVariables = {};
export type HomeFeaturedMarketNews_Test_QueryResponse = {
    readonly articles: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedMarketNews_articles">;
    } | null> | null;
};
export type HomeFeaturedMarketNews_Test_Query = {
    readonly response: HomeFeaturedMarketNews_Test_QueryResponse;
    readonly variables: HomeFeaturedMarketNews_Test_QueryVariables;
};



/*
query HomeFeaturedMarketNews_Test_Query {
  articles {
    ...HomeFeaturedMarketNews_articles
    id
  }
}

fragment HomeFeaturedMarketNews_articles on Article {
  internalID
  href
  slug
  title
  publishedAt(format: "MMM D YYYY")
  vertical
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
  author {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v6 = {
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
    "name": "HomeFeaturedMarketNews_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "articles",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeFeaturedMarketNews_articles"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedMarketNews_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "articles",
        "plural": true,
        "selections": [
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
            "name": "href",
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "publishedAt",
            "storageKey": "publishedAt(format:\"MMM D YYYY\")"
          },
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
                "selections": (v0/*: any*/),
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
                "selections": (v0/*: any*/),
                "storageKey": "cropped(height:240,width:325)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Author",
            "kind": "LinkedField",
            "name": "author",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "articles": {
          "type": "Article",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "articles.id": (v2/*: any*/),
        "articles.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "articles.href": (v3/*: any*/),
        "articles.slug": (v3/*: any*/),
        "articles.title": (v3/*: any*/),
        "articles.publishedAt": (v3/*: any*/),
        "articles.vertical": (v3/*: any*/),
        "articles.thumbnailTitle": (v3/*: any*/),
        "articles.thumbnailImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "articles.author": {
          "type": "Author",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "articles.thumbnailImage.large": (v4/*: any*/),
        "articles.thumbnailImage.small": (v4/*: any*/),
        "articles.author.name": (v3/*: any*/),
        "articles.author.id": (v2/*: any*/),
        "articles.thumbnailImage.large.width": (v5/*: any*/),
        "articles.thumbnailImage.large.height": (v5/*: any*/),
        "articles.thumbnailImage.large.src": (v6/*: any*/),
        "articles.thumbnailImage.large.srcSet": (v6/*: any*/),
        "articles.thumbnailImage.small.width": (v5/*: any*/),
        "articles.thumbnailImage.small.height": (v5/*: any*/),
        "articles.thumbnailImage.small.src": (v6/*: any*/),
        "articles.thumbnailImage.small.srcSet": (v6/*: any*/)
      }
    },
    "name": "HomeFeaturedMarketNews_Test_Query",
    "operationKind": "query",
    "text": "query HomeFeaturedMarketNews_Test_Query {\n  articles {\n    ...HomeFeaturedMarketNews_articles\n    id\n  }\n}\n\nfragment HomeFeaturedMarketNews_articles on Article {\n  internalID\n  href\n  slug\n  title\n  publishedAt(format: \"MMM D YYYY\")\n  vertical\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  author {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '4eb01c1267af550f1e7fc29c9bba7b8e';
export default node;
