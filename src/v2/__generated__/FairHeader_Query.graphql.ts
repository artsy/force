/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeader_QueryVariables = {
    slug: string;
};
export type FairHeader_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
    } | null;
};
export type FairHeader_QueryRawResponse = {
    readonly fair: ({
        readonly about: string | null;
        readonly summary: string | null;
        readonly formattedOpeningHours: string | null;
        readonly name: string | null;
        readonly slug: string;
        readonly profile: ({
            readonly icon: ({
                readonly _1x: ({
                    readonly src: string | null;
                }) | null;
                readonly _2x: ({
                    readonly src: string | null;
                }) | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly smallHero: ({
            readonly _1x: ({
                readonly src: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
            readonly _2x: ({
                readonly src: string | null;
            }) | null;
        }) | null;
        readonly mediumHero: ({
            readonly _1x: ({
                readonly src: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
            readonly _2x: ({
                readonly src: string | null;
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
        readonly id: string | null;
    }) | null;
};
export type FairHeader_Query = {
    readonly response: FairHeader_QueryResponse;
    readonly variables: FairHeader_QueryVariables;
    readonly rawResponse: FairHeader_QueryRawResponse;
};



/*
query FairHeader_Query(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairHeader_fair
    id
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v8 = [
  (v4/*: any*/),
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
  }
],
v9 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairHeader_Query",
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
            "name": "FairHeader_fair"
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
    "name": "FairHeader_Query",
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
            "kind": "ScalarField",
            "name": "slug",
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
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 80
                      },
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
              (v6/*: any*/)
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
                  (v7/*: any*/),
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
                "selections": (v8/*: any*/),
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
                  (v7/*: any*/),
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
                  (v7/*: any*/),
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
                "selections": (v8/*: any*/),
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
                  (v7/*: any*/),
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
              (v6/*: any*/)
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
            "args": (v9/*: any*/),
            "kind": "ScalarField",
            "name": "hours",
            "storageKey": "hours(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "kind": "ScalarField",
            "name": "links",
            "storageKey": "links(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "kind": "ScalarField",
            "name": "tickets",
            "storageKey": "tickets(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "kind": "ScalarField",
            "name": "contact",
            "storageKey": "contact(format:\"HTML\")"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairHeader_Query",
    "operationKind": "query",
    "text": "query FairHeader_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairHeader_fair\n    id\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  about\n  summary\n  formattedOpeningHours\n  name\n  slug\n  profile {\n    icon {\n      _1x: cropped(width: 40, height: 40, version: \"square140\") {\n        src: url\n      }\n      _2x: cropped(width: 80, height: 80, version: \"square140\") {\n        src: url\n      }\n    }\n    id\n  }\n  smallHero: image {\n    _1x: cropped(width: 375, height: 500, version: \"wide\") {\n      src: url\n      width\n      height\n    }\n    _2x: cropped(width: 750, height: 1000, version: \"wide\") {\n      src: url\n    }\n  }\n  mediumHero: image {\n    _1x: cropped(width: 600, height: 800, version: \"wide\") {\n      src: url\n      width\n      height\n    }\n    _2x: cropped(width: 1200, height: 1600, version: \"wide\") {\n      src: url\n    }\n  }\n  tagline\n  location {\n    summary\n    id\n  }\n  ticketsLink\n  hours(format: HTML)\n  links(format: HTML)\n  tickets(format: HTML)\n  contact(format: HTML)\n}\n"
  }
};
})();
(node as any).hash = 'af5c0d423dbab8c7879f98b99dd99ebd';
export default node;
