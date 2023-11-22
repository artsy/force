/**
 * @generated SignedSource<<d14b59332919d480160deefc7c3fb807>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RssArticlesQuery$variables = {
  channelId: string;
};
export type RssArticlesQuery$data = {
  readonly articlesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly byline: string | null | undefined;
        readonly hero: {
          readonly embed?: string | null | undefined;
          readonly image?: {
            readonly resized: {
              readonly src: string;
            } | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly href: string | null | undefined;
        readonly id: string;
        readonly publishedAt: string | null | undefined;
        readonly sections: ReadonlyArray<{
          readonly __typename: "ArticleSectionEmbed";
          readonly url: string | null | undefined;
        } | {
          readonly __typename: "ArticleSectionImageCollection";
          readonly figures: ReadonlyArray<{
            readonly __typename: "ArticleImageSection";
            readonly image: {
              readonly caption: string | null | undefined;
              readonly resized: {
                readonly height: number | null | undefined;
                readonly src: string;
                readonly srcSet: string;
                readonly width: number | null | undefined;
              } | null | undefined;
            } | null | undefined;
          } | {
            readonly __typename: "Artwork";
            readonly artists: ReadonlyArray<{
              readonly name: string | null | undefined;
            } | null | undefined> | null | undefined;
            readonly date: string | null | undefined;
            readonly image: {
              readonly resized: {
                readonly height: number | null | undefined;
                readonly src: string;
                readonly srcSet: string;
                readonly width: number | null | undefined;
              } | null | undefined;
            } | null | undefined;
            readonly partner: {
              readonly name: string | null | undefined;
            } | null | undefined;
            readonly title: string | null | undefined;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          }>;
        } | {
          readonly __typename: "ArticleSectionImageSet";
          readonly figures: ReadonlyArray<{
            readonly __typename: "ArticleImageSection";
            readonly image: {
              readonly caption: string | null | undefined;
              readonly resized: {
                readonly height: number | null | undefined;
                readonly src: string;
                readonly srcSet: string;
                readonly width: number | null | undefined;
              } | null | undefined;
            } | null | undefined;
          } | {
            readonly __typename: "Artwork";
            readonly artists: ReadonlyArray<{
              readonly name: string | null | undefined;
            } | null | undefined> | null | undefined;
            readonly date: string | null | undefined;
            readonly image: {
              readonly resized: {
                readonly height: number | null | undefined;
                readonly src: string;
                readonly srcSet: string;
                readonly width: number | null | undefined;
              } | null | undefined;
            } | null | undefined;
            readonly partner: {
              readonly name: string | null | undefined;
            } | null | undefined;
            readonly title: string | null | undefined;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          }>;
        } | {
          readonly __typename: "ArticleSectionText";
          readonly body: string | null | undefined;
        } | {
          readonly __typename: "ArticleSectionVideo";
          readonly embed: string | null | undefined;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        }>;
        readonly thumbnailImage: {
          readonly resized: {
            readonly src: string;
          } | null | undefined;
        } | null | undefined;
        readonly thumbnailTitle: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type RssArticlesQuery = {
  response: RssArticlesQuery$data;
  variables: RssArticlesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channelId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "channelId",
    "variableName": "channelId"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publishedAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnailTitle",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "width",
        "value": 1100
      }
    ],
    "concreteType": "ResizedImageUrl",
    "kind": "LinkedField",
    "name": "resized",
    "plural": false,
    "selections": [
      (v5/*: any*/)
    ],
    "storageKey": "resized(width:1100)"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "thumbnailImage",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "embed",
  "storageKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": [
    (v10/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": (v6/*: any*/),
      "storageKey": null
    }
  ],
  "type": "ArticleFeatureSection",
  "abstractKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v13 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    }
  ],
  "type": "ArticleSectionText",
  "abstractKey": null
},
v14 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
  "type": "ArticleSectionEmbed",
  "abstractKey": null
},
v15 = {
  "kind": "InlineFragment",
  "selections": [
    (v10/*: any*/)
  ],
  "type": "ArticleSectionVideo",
  "abstractKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v19 = [
  (v18/*: any*/)
],
v20 = {
  "kind": "Literal",
  "name": "width",
  "value": 500
},
v21 = [
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v22 = {
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
          "value": [
            "normalized",
            "larger",
            "large"
          ]
        },
        (v20/*: any*/)
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": (v21/*: any*/),
      "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:500)"
    }
  ],
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "caption",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v20/*: any*/)
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": (v21/*: any*/),
      "storageKey": "resized(width:500)"
    }
  ],
  "storageKey": null
},
v24 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "figures",
    "plural": true,
    "selections": [
      (v12/*: any*/),
      {
        "kind": "InlineFragment",
        "selections": [
          (v16/*: any*/),
          (v17/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": (v19/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": (v19/*: any*/),
            "storageKey": null
          },
          (v22/*: any*/)
        ],
        "type": "Artwork",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          (v23/*: any*/)
        ],
        "type": "ArticleImageSection",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
],
v25 = [
  (v18/*: any*/),
  (v2/*: any*/)
],
v26 = {
  "kind": "InlineFragment",
  "selections": [
    (v16/*: any*/),
    (v17/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": (v25/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": (v25/*: any*/),
      "storageKey": null
    },
    (v22/*: any*/)
  ],
  "type": "Artwork",
  "abstractKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    (v23/*: any*/),
    (v2/*: any*/)
  ],
  "type": "ArticleImageSection",
  "abstractKey": null
},
v28 = [
  (v2/*: any*/)
],
v29 = {
  "kind": "InlineFragment",
  "selections": (v28/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RssArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "hero",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "sections",
                    "plural": true,
                    "selections": [
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v24/*: any*/),
                        "type": "ArticleSectionImageCollection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v24/*: any*/),
                        "type": "ArticleSectionImageSet",
                        "abstractKey": null
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
    "name": "RssArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "hero",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "sections",
                    "plural": true,
                    "selections": [
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "figures",
                            "plural": true,
                            "selections": [
                              (v12/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/),
                              (v29/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v28/*: any*/),
                                "type": "ArticleUnpublishedArtwork",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ArticleSectionImageCollection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "figures",
                            "plural": true,
                            "selections": [
                              (v12/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/),
                              (v29/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ArticleSectionImageSet",
                        "abstractKey": null
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9bb1d52c83c37b7e6489b09f60ededb4",
    "id": null,
    "metadata": {},
    "name": "RssArticlesQuery",
    "operationKind": "query",
    "text": "query RssArticlesQuery(\n  $channelId: String!\n) {\n  articlesConnection(channelId: $channelId, sort: PUBLISHED_AT_DESC, first: 50) {\n    edges {\n      node {\n        id\n        publishedAt\n        thumbnailTitle\n        thumbnailImage {\n          resized(width: 1100) {\n            src\n          }\n        }\n        href\n        byline\n        hero {\n          __typename\n          ... on ArticleFeatureSection {\n            embed\n            image {\n              resized(width: 1100) {\n                src\n              }\n            }\n          }\n        }\n        sections {\n          __typename\n          ... on ArticleSectionText {\n            body\n          }\n          ... on ArticleSectionEmbed {\n            url\n          }\n          ... on ArticleSectionVideo {\n            embed\n          }\n          ... on ArticleSectionImageCollection {\n            figures {\n              __typename\n              ... on Artwork {\n                title\n                date\n                artists {\n                  name\n                  id\n                }\n                partner {\n                  name\n                  id\n                }\n                image {\n                  resized(width: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n              }\n              ... on ArticleImageSection {\n                image {\n                  caption\n                  resized(width: 500) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n                id\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n              ... on ArticleUnpublishedArtwork {\n                id\n              }\n            }\n          }\n          ... on ArticleSectionImageSet {\n            figures {\n              __typename\n              ... on Artwork {\n                title\n                date\n                artists {\n                  name\n                  id\n                }\n                partner {\n                  name\n                  id\n                }\n                image {\n                  resized(width: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n              }\n              ... on ArticleImageSection {\n                image {\n                  caption\n                  resized(width: 500) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n                id\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cd178caafd928c3c9a95c51b55b95e1c";

export default node;
