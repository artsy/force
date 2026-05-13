/**
 * @generated SignedSource<<5fd9d339ac8f719f017fec7809678afb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistEditorialNewsGridQuery$variables = {
  id: string;
};
export type ArtistEditorialNewsGridQuery$data = {
  readonly artist: {
    readonly articlesConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly byline: string | null | undefined;
          readonly href: string | null | undefined;
          readonly internalID: string;
          readonly publishedAt: string | null | undefined;
          readonly slug: string | null | undefined;
          readonly thumbnailImage: {
            readonly large: {
              readonly height: number;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number;
            } | null | undefined;
          } | null | undefined;
          readonly thumbnailTitle: string | null | undefined;
          readonly title: string | null | undefined;
          readonly vertical: string | null | undefined;
          readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly href: string | null | undefined;
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined;
};
export type ArtistEditorialNewsGridQuery = {
  response: ArtistEditorialNewsGridQuery$data;
  variables: ArtistEditorialNewsGridQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = [
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vertical",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnailTitle",
  "storageKey": null
},
v12 = [
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
v13 = {
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
  "selections": (v12/*: any*/),
  "storageKey": "cropped(height:720,width:670)"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistEditorialNewsGridQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v6/*: any*/),
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
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "CellArticle_article"
                      },
                      (v2/*: any*/),
                      (v5/*: any*/),
                      (v7/*: any*/),
                      (v4/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "thumbnailImage",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/)
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
            "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
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
    "name": "ArtistEditorialNewsGridQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v6/*: any*/),
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
                      (v10/*: any*/),
                      (v8/*: any*/),
                      (v11/*: any*/),
                      (v7/*: any*/),
                      (v5/*: any*/),
                      (v9/*: any*/),
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
                            "selections": (v12/*: any*/),
                            "storageKey": "cropped(height:334,width:445)"
                          },
                          (v13/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v4/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v14/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a921c1f3bc1b46654370f5901612ec18",
    "id": null,
    "metadata": {},
    "name": "ArtistEditorialNewsGridQuery",
    "operationKind": "query",
    "text": "query ArtistEditorialNewsGridQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    internalID\n    name\n    slug\n    href\n    articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {\n      edges {\n        node {\n          ...CellArticle_article\n          internalID\n          href\n          byline\n          slug\n          title\n          publishedAt(format: \"MMM D, YYYY\")\n          vertical\n          thumbnailTitle\n          thumbnailImage {\n            large: cropped(width: 670, height: 720) {\n              width\n              height\n              src\n              srcSet\n            }\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3b4ab17641f95a6465c5d80bd97e573c";

export default node;
