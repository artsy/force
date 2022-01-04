/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairEditorialItem_Test_QueryVariables = {};
export type FairEditorialItem_Test_QueryResponse = {
    readonly article: {
        readonly " $fragmentRefs": FragmentRefs<"FairEditorialItem_article">;
    } | null;
};
export type FairEditorialItem_Test_Query = {
    readonly response: FairEditorialItem_Test_QueryResponse;
    readonly variables: FairEditorialItem_Test_QueryVariables;
};



/*
query FairEditorialItem_Test_Query {
  article(id: "test") {
    ...FairEditorialItem_article
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = [
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
v2 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "name": "FairEditorialItem_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairEditorialItem_article"
          }
        ],
        "storageKey": "article(id:\"test\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairEditorialItem_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
                "selections": (v1/*: any*/),
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
                "selections": (v1/*: any*/),
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
        "storageKey": "article(id:\"test\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "type": "Article",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "article.id": (v2/*: any*/),
        "article.title": (v3/*: any*/),
        "article.publishedAt": (v3/*: any*/),
        "article.thumbnailTitle": (v3/*: any*/),
        "article.thumbnailImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "article.thumbnailImage.large": (v4/*: any*/),
        "article.thumbnailImage.small": (v4/*: any*/),
        "article.internalID": (v2/*: any*/),
        "article.slug": (v3/*: any*/),
        "article.href": (v3/*: any*/),
        "article.thumbnailImage.large.width": (v5/*: any*/),
        "article.thumbnailImage.large.height": (v5/*: any*/),
        "article.thumbnailImage.large.src": (v6/*: any*/),
        "article.thumbnailImage.large.srcSet": (v6/*: any*/),
        "article.thumbnailImage.small.width": (v5/*: any*/),
        "article.thumbnailImage.small.height": (v5/*: any*/),
        "article.thumbnailImage.small.src": (v6/*: any*/),
        "article.thumbnailImage.small.srcSet": (v6/*: any*/)
      }
    },
    "name": "FairEditorialItem_Test_Query",
    "operationKind": "query",
    "text": "query FairEditorialItem_Test_Query {\n  article(id: \"test\") {\n    ...FairEditorialItem_article\n    id\n  }\n}\n\nfragment FairEditorialItemLink_article on Article {\n  internalID\n  slug\n  title\n  href\n  publishedAt(format: \"MMMM D, YYYY\")\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  title\n  publishedAt(format: \"MMMM D, YYYY\")\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  ...FairEditorialItemLink_article\n}\n"
  }
};
})();
(node as any).hash = '36537dc525d6d806edadddd274fa7d10';
export default node;
