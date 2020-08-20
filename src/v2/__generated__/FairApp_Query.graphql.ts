/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairApp_QueryVariables = {
    slug: string;
};
export type FairApp_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
    } | null;
};
export type FairApp_QueryRawResponse = {
    readonly fair: ({
        readonly slug: string;
        readonly about: string | null;
        readonly summary: string | null;
        readonly formattedOpeningHours: string | null;
        readonly name: string | null;
        readonly profile: ({
            readonly icon: ({
                readonly cropped: ({
                    readonly src: string | null;
                }) | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly image: ({
            readonly cropped: ({
                readonly src: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
        }) | null;
        readonly tagline: string | null;
        readonly location: ({
            readonly summary: string | null;
            readonly id: string | null;
        }) | null;
        readonly ticketsLink: string | null;
        readonly hours: string | null;
        readonly links: string | null;
        readonly tickets: string | null;
        readonly contact: string | null;
        readonly articles: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly title: string | null;
                    readonly href: string | null;
                    readonly publishedAt: string | null;
                    readonly thumbnailTitle: string | null;
                    readonly thumbnailImage: ({
                        readonly _1x: ({
                            readonly width: number | null;
                            readonly height: number | null;
                            readonly src: string | null;
                        }) | null;
                        readonly _2x: ({
                            readonly width: number | null;
                            readonly height: number | null;
                            readonly src: string | null;
                        }) | null;
                    }) | null;
                }) | null;
                readonly __typename: string;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type FairApp_Query = {
    readonly response: FairApp_QueryResponse;
    readonly variables: FairApp_QueryVariables;
    readonly rawResponse: FairApp_QueryRawResponse;
};



/*
query FairApp_Query(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairApp_fair
    id
  }
}

fragment FairApp_fair on Fair {
  slug
  ...FairHeader_fair
  ...FairEditorial_fair
  articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
    edges {
      __typename
    }
  }
}

fragment FairEditorialItem_article on Article {
  id
  title
  href
  publishedAt(format: "MMM Do, YY")
  thumbnailTitle
  thumbnailImage {
    _1x: cropped(width: 140, height: 80) {
      width
      height
      src: url
    }
    _2x: cropped(width: 280, height: 160) {
      width
      height
      src: url
    }
  }
}

fragment FairEditorial_fair on Fair {
  articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
    edges {
      node {
        id
        ...FairEditorialItem_article
      }
    }
  }
}

fragment FairHeader_fair on Fair {
  about
  summary
  formattedOpeningHours
  name
  slug
  profile {
    icon {
      cropped(width: 120, height: 120, version: "square140") {
        src: url
      }
    }
    id
  }
  image {
    cropped(width: 750, height: 1000, version: "wide") {
      src: url
      width
      height
    }
  }
  tagline
  location {
    summary
    id
  }
  ticketsLink
  hours(format: HTML)
  links(format: HTML)
  tickets(format: HTML)
  contact(format: HTML)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summary",
  "storageKey": null
},
v3 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v8 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairApp_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairApp_fair"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FairApp_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
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
            "name": "about",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedOpeningHours",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 120
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square140"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 120
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": "cropped(height:120,version:\"square140\",width:120)"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
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
                    "value": 1000
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "wide"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 750
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": "cropped(height:1000,version:\"wide\",width:750)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tagline",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "ticketsLink",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "hours",
            "storageKey": "hours(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "links",
            "storageKey": "links(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "tickets",
            "storageKey": "tickets(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "contact",
            "storageKey": "contact(format:\"HTML\")"
          },
          {
            "alias": "articles",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5
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
                      (v4/*: any*/),
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
                        "name": "href",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM Do, YY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM Do, YY\")"
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
                            "alias": "_1x",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 80
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 140
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v8/*: any*/),
                            "storageKey": "cropped(height:80,width:140)"
                          },
                          {
                            "alias": "_2x",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 160
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 280
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v8/*: any*/),
                            "storageKey": "cropped(height:160,width:280)"
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
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:5,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairApp_Query",
    "operationKind": "query",
    "text": "query FairApp_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairApp_fair\n    id\n  }\n}\n\nfragment FairApp_fair on Fair {\n  slug\n  ...FairHeader_fair\n  ...FairEditorial_fair\n  articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {\n    edges {\n      __typename\n    }\n  }\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  title\n  href\n  publishedAt(format: \"MMM Do, YY\")\n  thumbnailTitle\n  thumbnailImage {\n    _1x: cropped(width: 140, height: 80) {\n      width\n      height\n      src: url\n    }\n    _2x: cropped(width: 280, height: 160) {\n      width\n      height\n      src: url\n    }\n  }\n}\n\nfragment FairEditorial_fair on Fair {\n  articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        id\n        ...FairEditorialItem_article\n      }\n    }\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  about\n  summary\n  formattedOpeningHours\n  name\n  slug\n  profile {\n    icon {\n      cropped(width: 120, height: 120, version: \"square140\") {\n        src: url\n      }\n    }\n    id\n  }\n  image {\n    cropped(width: 750, height: 1000, version: \"wide\") {\n      src: url\n      width\n      height\n    }\n  }\n  tagline\n  location {\n    summary\n    id\n  }\n  ticketsLink\n  hours(format: HTML)\n  links(format: HTML)\n  tickets(format: HTML)\n  contact(format: HTML)\n}\n"
  }
};
})();
(node as any).hash = '6ed1d4f2f01fdfc42f25440eb7cc7725';
export default node;
