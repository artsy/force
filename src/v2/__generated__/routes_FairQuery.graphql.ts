/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_FairQueryVariables = {
    slug: string;
};
export type routes_FairQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
    } | null;
};
export type routes_FairQuery = {
    readonly response: routes_FairQueryResponse;
    readonly variables: routes_FairQueryVariables;
};



/*
query routes_FairQuery(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairApp_fair
    id
  }
}

fragment FairApp_fair on Fair {
  slug
  ...FairMeta_fair
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
      _1x: cropped(width: 40, height: 40, version: "square140") {
        src: url
      }
      _2x: cropped(width: 80, height: 80, version: "square140") {
        src: url
      }
    }
    id
  }
  smallHero: image {
    _1x: cropped(width: 375, height: 500, version: "wide") {
      src: url
      width
      height
    }
    _2x: cropped(width: 750, height: 1000, version: "wide") {
      src: url
    }
  }
  mediumHero: image {
    _1x: cropped(width: 600, height: 800, version: "wide") {
      src: url
      width
      height
    }
    _2x: cropped(width: 1200, height: 1600, version: "wide") {
      src: url
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

fragment FairMeta_fair on Fair {
  name
  slug
  metaDescription: summary
  metaImage: image {
    src: url(version: "large_rectangle")
  }
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
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v4 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
v6 = {
  "kind": "Literal",
  "name": "height",
  "value": 80
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v11 = [
  (v4/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v13 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_FairQuery",
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
    "name": "routes_FairQuery",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": "metaDescription",
            "args": null,
            "kind": "ScalarField",
            "name": "summary",
            "storageKey": null
          },
          {
            "alias": "metaImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "src",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large_rectangle"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large_rectangle\")"
              }
            ],
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
                    "alias": "_1x",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 40
                      },
                      (v3/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 40
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": "cropped(height:40,version:\"square140\",width:40)"
                  },
                  {
                    "alias": "_2x",
                    "args": [
                      (v6/*: any*/),
                      (v3/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": "cropped(height:80,version:\"square140\",width:80)"
                  }
                ],
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "smallHero",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "_1x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 500
                  },
                  (v8/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 375
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v11/*: any*/),
                "storageKey": "cropped(height:500,version:\"wide\",width:375)"
              },
              {
                "alias": "_2x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 1000
                  },
                  (v8/*: any*/),
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
                "selections": (v5/*: any*/),
                "storageKey": "cropped(height:1000,version:\"wide\",width:750)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "mediumHero",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "_1x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 800
                  },
                  (v8/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 600
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v11/*: any*/),
                "storageKey": "cropped(height:800,version:\"wide\",width:600)"
              },
              {
                "alias": "_2x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 1600
                  },
                  (v8/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1200
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": "cropped(height:1600,version:\"wide\",width:1200)"
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
              (v7/*: any*/)
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
            "args": (v12/*: any*/),
            "kind": "ScalarField",
            "name": "hours",
            "storageKey": "hours(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v12/*: any*/),
            "kind": "ScalarField",
            "name": "links",
            "storageKey": "links(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v12/*: any*/),
            "kind": "ScalarField",
            "name": "tickets",
            "storageKey": "tickets(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v12/*: any*/),
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
                      (v7/*: any*/),
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
                              (v6/*: any*/),
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
                            "selections": (v13/*: any*/),
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
                            "selections": (v13/*: any*/),
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
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "routes_FairQuery",
    "operationKind": "query",
    "text": "query routes_FairQuery(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairApp_fair\n    id\n  }\n}\n\nfragment FairApp_fair on Fair {\n  slug\n  ...FairMeta_fair\n  ...FairHeader_fair\n  ...FairEditorial_fair\n  articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {\n    edges {\n      __typename\n    }\n  }\n}\n\nfragment FairEditorialItem_article on Article {\n  id\n  title\n  href\n  publishedAt(format: \"MMM Do, YY\")\n  thumbnailTitle\n  thumbnailImage {\n    _1x: cropped(width: 140, height: 80) {\n      width\n      height\n      src: url\n    }\n    _2x: cropped(width: 280, height: 160) {\n      width\n      height\n      src: url\n    }\n  }\n}\n\nfragment FairEditorial_fair on Fair {\n  articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        id\n        ...FairEditorialItem_article\n      }\n    }\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  about\n  summary\n  formattedOpeningHours\n  name\n  slug\n  profile {\n    icon {\n      _1x: cropped(width: 40, height: 40, version: \"square140\") {\n        src: url\n      }\n      _2x: cropped(width: 80, height: 80, version: \"square140\") {\n        src: url\n      }\n    }\n    id\n  }\n  smallHero: image {\n    _1x: cropped(width: 375, height: 500, version: \"wide\") {\n      src: url\n      width\n      height\n    }\n    _2x: cropped(width: 750, height: 1000, version: \"wide\") {\n      src: url\n    }\n  }\n  mediumHero: image {\n    _1x: cropped(width: 600, height: 800, version: \"wide\") {\n      src: url\n      width\n      height\n    }\n    _2x: cropped(width: 1200, height: 1600, version: \"wide\") {\n      src: url\n    }\n  }\n  tagline\n  location {\n    summary\n    id\n  }\n  ticketsLink\n  hours(format: HTML)\n  links(format: HTML)\n  tickets(format: HTML)\n  contact(format: HTML)\n}\n\nfragment FairMeta_fair on Fair {\n  name\n  slug\n  metaDescription: summary\n  metaImage: image {\n    src: url(version: \"large_rectangle\")\n  }\n}\n"
  }
};
})();
(node as any).hash = '29ebab49c37fd2a909f860b8d0e37c22';
export default node;
