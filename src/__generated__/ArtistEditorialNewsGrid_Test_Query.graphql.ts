/**
 * @generated SignedSource<<6a4641fafc0377387cd7a8b35815831d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistEditorialNewsGrid_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistEditorialNewsGrid_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistEditorialNewsGrid_artist">;
  } | null | undefined;
};
export type ArtistEditorialNewsGrid_Test_Query = {
  response: ArtistEditorialNewsGrid_Test_Query$data;
  variables: ArtistEditorialNewsGrid_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-artist"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "name": "href",
  "storageKey": null
},
v4 = [
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistEditorialNewsGrid_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistEditorialNewsGrid_artist"
          }
        ],
        "storageKey": "artist(id:\"test-artist\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistEditorialNewsGrid_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
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
                      (v3/*: any*/),
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
                            "selections": (v4/*: any*/),
                            "storageKey": "cropped(height:334,width:445)"
                          },
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
                            "selections": (v4/*: any*/),
                            "storageKey": "cropped(height:720,width:670)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v5/*: any*/)
        ],
        "storageKey": "artist(id:\"test-artist\")"
      }
    ]
  },
  "params": {
    "cacheID": "0a22e5c7ee4958827bb611a5dc7f663a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "artist.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "artist.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "artist.articlesConnection.edges.node.byline": (v6/*: any*/),
        "artist.articlesConnection.edges.node.href": (v6/*: any*/),
        "artist.articlesConnection.edges.node.id": (v7/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v7/*: any*/),
        "artist.articlesConnection.edges.node.publishedAt": (v6/*: any*/),
        "artist.articlesConnection.edges.node.slug": (v6/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.articlesConnection.edges.node.thumbnailImage.cropped": (v8/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.height": (v9/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.src": (v10/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v10/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.cropped.width": (v9/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.large": (v8/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.large.height": (v9/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.large.src": (v10/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.large.srcSet": (v10/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.large.width": (v9/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailTitle": (v6/*: any*/),
        "artist.articlesConnection.edges.node.title": (v6/*: any*/),
        "artist.articlesConnection.edges.node.vertical": (v6/*: any*/),
        "artist.href": (v6/*: any*/),
        "artist.id": (v7/*: any*/),
        "artist.internalID": (v7/*: any*/),
        "artist.name": (v6/*: any*/),
        "artist.slug": (v7/*: any*/)
      }
    },
    "name": "ArtistEditorialNewsGrid_Test_Query",
    "operationKind": "query",
    "text": "query ArtistEditorialNewsGrid_Test_Query {\n  artist(id: \"test-artist\") {\n    ...ArtistEditorialNewsGrid_artist\n    id\n  }\n}\n\nfragment ArtistEditorialNewsGrid_artist on Artist {\n  internalID\n  name\n  slug\n  href\n  articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        href\n        byline\n        slug\n        title\n        publishedAt(format: \"MMM D, YYYY\")\n        vertical\n        thumbnailTitle\n        thumbnailImage {\n          large: cropped(width: 670, height: 720) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2a3004d516c28d2a53cfd0d354d74503";

export default node;
