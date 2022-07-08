/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RssPartnerUpdatesQueryVariables = {
    channelId: string;
};
export type RssPartnerUpdatesQueryResponse = {
    readonly articlesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly publishedAt: string | null;
                readonly thumbnailTitle: string | null;
                readonly href: string | null;
                readonly byline: string | null;
                readonly hero: {
                    readonly embed?: string | null | undefined;
                    readonly image?: {
                        readonly resized: {
                            readonly src: string;
                        } | null;
                    } | null | undefined;
                } | null;
                readonly sections: ReadonlyArray<{
                    readonly __typename: "ArticleSectionText";
                    readonly body: string | null;
                } | {
                    readonly __typename: "ArticleSectionEmbed";
                    readonly url: string | null;
                } | {
                    readonly __typename: "ArticleSectionVideo";
                    readonly embed: string | null;
                } | {
                    readonly __typename: "ArticleSectionImageCollection";
                    readonly figures: ReadonlyArray<{
                        readonly __typename: "Artwork";
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly artists: ReadonlyArray<{
                            readonly name: string | null;
                        } | null> | null;
                        readonly partner: {
                            readonly name: string | null;
                        } | null;
                        readonly image: {
                            readonly resized: {
                                readonly width: number | null;
                                readonly height: number | null;
                                readonly src: string;
                                readonly srcSet: string;
                            } | null;
                        } | null;
                    } | {
                        readonly __typename: "ArticleImageSection";
                        readonly image: {
                            readonly caption: string | null;
                            readonly resized: {
                                readonly width: number | null;
                                readonly height: number | null;
                                readonly src: string;
                                readonly srcSet: string;
                            } | null;
                        } | null;
                    } | {
                        /*This will never be '%other', but we need some
                        value in case none of the concrete values match.*/
                        readonly __typename: "%other";
                    }>;
                } | {
                    readonly __typename: "ArticleSectionImageSet";
                    readonly figures: ReadonlyArray<{
                        readonly __typename: "Artwork";
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly artists: ReadonlyArray<{
                            readonly name: string | null;
                        } | null> | null;
                        readonly partner: {
                            readonly name: string | null;
                        } | null;
                        readonly image: {
                            readonly resized: {
                                readonly width: number | null;
                                readonly height: number | null;
                                readonly src: string;
                                readonly srcSet: string;
                            } | null;
                        } | null;
                    } | {
                        readonly __typename: "ArticleImageSection";
                        readonly image: {
                            readonly caption: string | null;
                            readonly resized: {
                                readonly width: number | null;
                                readonly height: number | null;
                                readonly src: string;
                                readonly srcSet: string;
                            } | null;
                        } | null;
                    } | {
                        /*This will never be '%other', but we need some
                        value in case none of the concrete values match.*/
                        readonly __typename: "%other";
                    }>;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }>;
            } | null;
        } | null> | null;
    } | null;
};
export type RssPartnerUpdatesQuery = {
    readonly response: RssPartnerUpdatesQueryResponse;
    readonly variables: RssPartnerUpdatesQueryVariables;
};



/*
query RssPartnerUpdatesQuery(
  $channelId: String!
) {
  articlesConnection(channelId: $channelId, sort: PUBLISHED_AT_DESC, first: 50) {
    edges {
      node {
        id
        publishedAt
        thumbnailTitle
        href
        byline
        hero {
          __typename
          ... on ArticleFeatureSection {
            embed
            image {
              resized(width: 1100) {
                src
              }
            }
          }
        }
        sections {
          __typename
          ... on ArticleSectionText {
            body
          }
          ... on ArticleSectionEmbed {
            url
          }
          ... on ArticleSectionVideo {
            embed
          }
          ... on ArticleSectionImageCollection {
            figures {
              __typename
              ... on Artwork {
                title
                date
                artists {
                  name
                  id
                }
                partner {
                  name
                  id
                }
                image {
                  resized(width: 500, version: ["normalized", "larger", "large"]) {
                    width
                    height
                    src
                    srcSet
                  }
                }
              }
              ... on ArticleImageSection {
                image {
                  caption
                  resized(width: 500) {
                    width
                    height
                    src
                    srcSet
                  }
                }
                id
              }
              ... on Node {
                __isNode: __typename
                id
              }
            }
          }
          ... on ArticleSectionImageSet {
            figures {
              __typename
              ... on Artwork {
                title
                date
                artists {
                  name
                  id
                }
                partner {
                  name
                  id
                }
                image {
                  resized(width: 500, version: ["normalized", "larger", "large"]) {
                    width
                    height
                    src
                    srcSet
                  }
                }
              }
              ... on ArticleImageSection {
                image {
                  caption
                  resized(width: 500) {
                    width
                    height
                    src
                    srcSet
                  }
                }
                id
              }
              ... on Node {
                __isNode: __typename
                id
              }
            }
          }
        }
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
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "embed",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "selections": [
    (v7/*: any*/),
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
              "name": "width",
              "value": 1100
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            (v8/*: any*/)
          ],
          "storageKey": "resized(width:1100)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleFeatureSection",
  "abstractKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
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
v12 = {
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
v13 = {
  "kind": "InlineFragment",
  "selections": [
    (v7/*: any*/)
  ],
  "type": "ArticleSectionVideo",
  "abstractKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = [
  (v16/*: any*/)
],
v18 = {
  "kind": "Literal",
  "name": "width",
  "value": 500
},
v19 = [
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
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v20 = {
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
        (v18/*: any*/)
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": (v19/*: any*/),
      "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:500)"
    }
  ],
  "storageKey": null
},
v21 = {
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
        (v18/*: any*/)
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": (v19/*: any*/),
      "storageKey": "resized(width:500)"
    }
  ],
  "storageKey": null
},
v22 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "figures",
    "plural": true,
    "selections": [
      (v10/*: any*/),
      {
        "kind": "InlineFragment",
        "selections": [
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": (v17/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": (v17/*: any*/),
            "storageKey": null
          },
          (v20/*: any*/)
        ],
        "type": "Artwork",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          (v21/*: any*/)
        ],
        "type": "ArticleImageSection",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
],
v23 = [
  (v16/*: any*/),
  (v2/*: any*/)
],
v24 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "figures",
    "plural": true,
    "selections": [
      (v10/*: any*/),
      {
        "kind": "InlineFragment",
        "selections": [
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": (v23/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": (v23/*: any*/),
            "storageKey": null
          },
          (v20/*: any*/)
        ],
        "type": "Artwork",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          (v21/*: any*/),
          (v2/*: any*/)
        ],
        "type": "ArticleImageSection",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          (v2/*: any*/)
        ],
        "type": "Node",
        "abstractKey": "__isNode"
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RssPartnerUpdatesQuery",
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "hero",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/)
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
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v22/*: any*/),
                        "type": "ArticleSectionImageCollection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v22/*: any*/),
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
    "name": "RssPartnerUpdatesQuery",
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "hero",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v9/*: any*/)
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
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "166129c9c392d010aeb96cf95a83d621",
    "id": null,
    "metadata": {},
    "name": "RssPartnerUpdatesQuery",
    "operationKind": "query",
    "text": "query RssPartnerUpdatesQuery(\n  $channelId: String!\n) {\n  articlesConnection(channelId: $channelId, sort: PUBLISHED_AT_DESC, first: 50) {\n    edges {\n      node {\n        id\n        publishedAt\n        thumbnailTitle\n        href\n        byline\n        hero {\n          __typename\n          ... on ArticleFeatureSection {\n            embed\n            image {\n              resized(width: 1100) {\n                src\n              }\n            }\n          }\n        }\n        sections {\n          __typename\n          ... on ArticleSectionText {\n            body\n          }\n          ... on ArticleSectionEmbed {\n            url\n          }\n          ... on ArticleSectionVideo {\n            embed\n          }\n          ... on ArticleSectionImageCollection {\n            figures {\n              __typename\n              ... on Artwork {\n                title\n                date\n                artists {\n                  name\n                  id\n                }\n                partner {\n                  name\n                  id\n                }\n                image {\n                  resized(width: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n              }\n              ... on ArticleImageSection {\n                image {\n                  caption\n                  resized(width: 500) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n                id\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n          }\n          ... on ArticleSectionImageSet {\n            figures {\n              __typename\n              ... on Artwork {\n                title\n                date\n                artists {\n                  name\n                  id\n                }\n                partner {\n                  name\n                  id\n                }\n                image {\n                  resized(width: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n              }\n              ... on ArticleImageSection {\n                image {\n                  caption\n                  resized(width: 500) {\n                    width\n                    height\n                    src\n                    srcSet\n                  }\n                }\n                id\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '458b75993ed1b38deb167f860d23ed72';
export default node;
