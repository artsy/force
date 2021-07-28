/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCurrentArticlesRail_Test_QueryVariables = {};
export type ArtistCurrentArticlesRail_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistCurrentArticlesRail_artist">;
    } | null;
};
export type ArtistCurrentArticlesRail_Test_Query = {
    readonly response: ArtistCurrentArticlesRail_Test_QueryResponse;
    readonly variables: ArtistCurrentArticlesRail_Test_QueryVariables;
};



/*
query ArtistCurrentArticlesRail_Test_Query {
  artist(id: "test") {
    ...ArtistCurrentArticlesRail_artist
    id
  }
}

fragment ArtistCurrentArticlesRail_artist on Artist {
  articlesConnection(first: 10, sort: PUBLISHED_AT_DESC, inEditorialFeed: true) {
    edges {
      node {
        internalID
        slug
        href
        thumbnailTitle
        publishedAt(format: "MMM Do, YYYY")
        thumbnailImage {
          sourceUrl: url(version: ["larger", "large"])
        }
        id
      }
    }
  }
  internalID
  name
  slug
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistCurrentArticlesRail_Test_Query",
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
            "name": "ArtistCurrentArticlesRail_artist"
          }
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistCurrentArticlesRail_Test_Query",
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
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "inEditorialFeed",
                "value": true
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
                      (v2/*: any*/),
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
                        "name": "thumbnailTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM Do, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
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
                            "alias": "sourceUrl",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "larger",
                                  "large"
                                ]
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"larger\",\"large\"])"
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:10,inEditorialFeed:true,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ArtistCurrentArticlesRail_Test_Query",
    "operationKind": "query",
    "text": "query ArtistCurrentArticlesRail_Test_Query {\n  artist(id: \"test\") {\n    ...ArtistCurrentArticlesRail_artist\n    id\n  }\n}\n\nfragment ArtistCurrentArticlesRail_artist on Artist {\n  articlesConnection(first: 10, sort: PUBLISHED_AT_DESC, inEditorialFeed: true) {\n    edges {\n      node {\n        internalID\n        slug\n        href\n        thumbnailTitle\n        publishedAt(format: \"MMM Do, YYYY\")\n        thumbnailImage {\n          sourceUrl: url(version: [\"larger\", \"large\"])\n        }\n        id\n      }\n    }\n  }\n  internalID\n  name\n  slug\n}\n"
  }
};
})();
(node as any).hash = '42b4222e5f8193294f17ddb5b387361e';
export default node;
