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
        readonly exhibitionPeriod: string | null;
        readonly startAt: string | null;
        readonly endAt: string | null;
        readonly name: string | null;
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
        readonly image: ({
            readonly _1x: ({
                readonly src: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
            readonly _2x: ({
                readonly src: string | null;
            }) | null;
            readonly md_1x: ({
                readonly src: string | null;
            }) | null;
            readonly md_2x: ({
                readonly src: string | null;
            }) | null;
            readonly lg_1x: ({
                readonly src: string | null;
            }) | null;
            readonly lg_2x: ({
                readonly src: string | null;
            }) | null;
        }) | null;
        readonly about: string | null;
        readonly summary: string | null;
        readonly slug: string;
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

fragment FairHeaderIcon_fair on Fair {
  name
  profile {
    icon {
      _1x: cropped(width: 60, height: 60, version: "square140") {
        src: url
      }
      _2x: cropped(width: 120, height: 120, version: "square140") {
        src: url
      }
    }
    id
  }
}

fragment FairHeaderImage_fair on Fair {
  ...FairHeaderIcon_fair
  name
  image {
    _1x: cropped(width: 375, height: 500, version: "wide") {
      src: url
      width
      height
    }
    _2x: cropped(width: 750, height: 1000, version: "wide") {
      src: url
    }
    md_1x: cropped(width: 600, height: 800, version: "wide") {
      src: url
    }
    md_2x: cropped(width: 1200, height: 1600, version: "wide") {
      src: url
    }
    lg_1x: cropped(width: 900, height: 1200, version: "wide") {
      src: url
    }
    lg_2x: cropped(width: 1800, height: 2400, version: "wide") {
      src: url
    }
  }
}

fragment FairHeader_fair on Fair {
  ...FairTiming_fair
  ...FairHeaderImage_fair
  about(format: HTML)
  summary(format: HTML)
  name
  slug
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

fragment FairTiming_fair on Fair {
  exhibitionPeriod
  startAt
  endAt
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
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v3 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v7 = [
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
            "name": "exhibitionPeriod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
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
                    "alias": "_1x",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 60
                      },
                      (v2/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 60
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": "cropped(height:60,version:\"square140\",width:60)"
                  },
                  {
                    "alias": "_2x",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 120
                      },
                      (v2/*: any*/),
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
                    "selections": (v4/*: any*/),
                    "storageKey": "cropped(height:120,version:\"square140\",width:120)"
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
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
                "alias": "_1x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 500
                  },
                  (v6/*: any*/),
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
                "selections": [
                  (v3/*: any*/),
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
                  (v6/*: any*/),
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
                "selections": (v4/*: any*/),
                "storageKey": "cropped(height:1000,version:\"wide\",width:750)"
              },
              {
                "alias": "md_1x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 800
                  },
                  (v6/*: any*/),
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
                "selections": (v4/*: any*/),
                "storageKey": "cropped(height:800,version:\"wide\",width:600)"
              },
              {
                "alias": "md_2x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 1600
                  },
                  (v6/*: any*/),
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
                "selections": (v4/*: any*/),
                "storageKey": "cropped(height:1600,version:\"wide\",width:1200)"
              },
              {
                "alias": "lg_1x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 1200
                  },
                  (v6/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 900
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": "cropped(height:1200,version:\"wide\",width:900)"
              },
              {
                "alias": "lg_2x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 2400
                  },
                  (v6/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1800
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": "cropped(height:2400,version:\"wide\",width:1800)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "about",
            "storageKey": "about(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "summary",
            "storageKey": "summary(format:\"HTML\")"
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "summary",
                "storageKey": null
              },
              (v5/*: any*/)
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
          (v5/*: any*/)
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
    "text": "query FairHeader_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairHeader_fair\n    id\n  }\n}\n\nfragment FairHeaderIcon_fair on Fair {\n  name\n  profile {\n    icon {\n      _1x: cropped(width: 60, height: 60, version: \"square140\") {\n        src: url\n      }\n      _2x: cropped(width: 120, height: 120, version: \"square140\") {\n        src: url\n      }\n    }\n    id\n  }\n}\n\nfragment FairHeaderImage_fair on Fair {\n  ...FairHeaderIcon_fair\n  name\n  image {\n    _1x: cropped(width: 375, height: 500, version: \"wide\") {\n      src: url\n      width\n      height\n    }\n    _2x: cropped(width: 750, height: 1000, version: \"wide\") {\n      src: url\n    }\n    md_1x: cropped(width: 600, height: 800, version: \"wide\") {\n      src: url\n    }\n    md_2x: cropped(width: 1200, height: 1600, version: \"wide\") {\n      src: url\n    }\n    lg_1x: cropped(width: 900, height: 1200, version: \"wide\") {\n      src: url\n    }\n    lg_2x: cropped(width: 1800, height: 2400, version: \"wide\") {\n      src: url\n    }\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  ...FairTiming_fair\n  ...FairHeaderImage_fair\n  about(format: HTML)\n  summary(format: HTML)\n  name\n  slug\n  tagline\n  location {\n    summary\n    id\n  }\n  ticketsLink\n  hours(format: HTML)\n  links(format: HTML)\n  tickets(format: HTML)\n  contact(format: HTML)\n}\n\nfragment FairTiming_fair on Fair {\n  exhibitionPeriod\n  startAt\n  endAt\n}\n"
  }
};
})();
(node as any).hash = 'af5c0d423dbab8c7879f98b99dd99ebd';
export default node;
