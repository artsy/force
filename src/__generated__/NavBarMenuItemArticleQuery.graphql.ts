/**
 * @generated SignedSource<<2732c1aa9645fb3d34105077a6aaaf63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMenuItemArticleQuery$variables = {
  isMobile: boolean;
};
export type NavBarMenuItemArticleQuery$data = {
  readonly articles?: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemArticle_article">;
  }>;
};
export type NavBarMenuItemArticleQuery = {
  response: NavBarMenuItemArticleQuery$data;
  variables: NavBarMenuItemArticleQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isMobile"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "featured",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "limit",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "published",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMenuItemArticleQuery",
    "selections": [
      {
        "condition": "isMobile",
        "kind": "Condition",
        "passingValue": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NavBarMenuItemArticle_article"
              }
            ],
            "storageKey": "articles(featured:true,limit:1,published:true,sort:\"PUBLISHED_AT_DESC\")"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NavBarMenuItemArticleQuery",
    "selections": [
      {
        "condition": "isMobile",
        "kind": "Condition",
        "passingValue": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
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
                    "storageKey": "cropped(height:720,width:670)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": "articles(featured:true,limit:1,published:true,sort:\"PUBLISHED_AT_DESC\")"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "d828c13617d23d2ca6608240cc7bcafe",
    "id": null,
    "metadata": {},
    "name": "NavBarMenuItemArticleQuery",
    "operationKind": "query",
    "text": "query NavBarMenuItemArticleQuery(\n  $isMobile: Boolean!\n) {\n  articles(featured: true, published: true, sort: PUBLISHED_AT_DESC, limit: 1) @skip(if: $isMobile) {\n    ...NavBarMenuItemArticle_article\n    id\n  }\n}\n\nfragment NavBarMenuItemArticle_article on Article {\n  internalID\n  href\n  vertical\n  title\n  thumbnailImage {\n    cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1b0b1dfc6ada28e3546845ded36517e1";

export default node;
