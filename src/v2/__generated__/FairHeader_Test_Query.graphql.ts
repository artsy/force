/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeader_Test_QueryVariables = {};
export type FairHeader_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
    } | null;
};
export type FairHeader_Test_Query = {
    readonly response: FairHeader_Test_QueryResponse;
    readonly variables: FairHeader_Test_QueryVariables;
};



/*
query FairHeader_Test_Query {
  fair(id: "example") {
    ...FairHeader_fair
    id
  }
}

fragment FairHeaderIcon_fair on Fair {
  name
  profile {
    icon {
      cropped(width: 100, height: 100, version: "square140") {
        src
        srcSet
      }
    }
    id
  }
}

fragment FairHeaderImage_fair on Fair {
  image {
    sm: cropped(width: 480, height: 600, version: "wide") {
      src
      srcSet
    }
    md: cropped(width: 900, height: 600, version: "wide") {
      src
      srcSet
    }
    lg: cropped(width: 1600, height: 600, version: "wide") {
      src
      srcSet
    }
  }
}

fragment FairHeader_fair on Fair {
  ...FairTiming_fair
  ...FairHeaderImage_fair
  ...FairHeaderIcon_fair
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
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "kind": "Literal",
  "name": "height",
  "value": 600
},
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "sm",
                "args": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 480
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": "cropped(height:600,version:\"wide\",width:480)"
              },
              {
                "alias": "md",
                "args": [
                  (v1/*: any*/),
                  (v2/*: any*/),
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
                "selections": (v3/*: any*/),
                "storageKey": "cropped(height:600,version:\"wide\",width:900)"
              },
              {
                "alias": "lg",
                "args": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1600
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": "cropped(height:600,version:\"wide\",width:1600)"
              }
            ],
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
                        "value": 100
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square140"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 100
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:100,version:\"square140\",width:100)"
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
            "args": (v5/*: any*/),
            "kind": "ScalarField",
            "name": "about",
            "storageKey": "about(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
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
            "args": (v5/*: any*/),
            "kind": "ScalarField",
            "name": "hours",
            "storageKey": "hours(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "kind": "ScalarField",
            "name": "links",
            "storageKey": "links(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "kind": "ScalarField",
            "name": "tickets",
            "storageKey": "tickets(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "kind": "ScalarField",
            "name": "contact",
            "storageKey": "contact(format:\"HTML\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairHeader_Test_Query",
    "operationKind": "query",
    "text": "query FairHeader_Test_Query {\n  fair(id: \"example\") {\n    ...FairHeader_fair\n    id\n  }\n}\n\nfragment FairHeaderIcon_fair on Fair {\n  name\n  profile {\n    icon {\n      cropped(width: 100, height: 100, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairHeaderImage_fair on Fair {\n  image {\n    sm: cropped(width: 480, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n    md: cropped(width: 900, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n    lg: cropped(width: 1600, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  ...FairTiming_fair\n  ...FairHeaderImage_fair\n  ...FairHeaderIcon_fair\n  about(format: HTML)\n  summary(format: HTML)\n  name\n  slug\n  tagline\n  location {\n    summary\n    id\n  }\n  ticketsLink\n  hours(format: HTML)\n  links(format: HTML)\n  tickets(format: HTML)\n  contact(format: HTML)\n}\n\nfragment FairTiming_fair on Fair {\n  exhibitionPeriod\n  startAt\n  endAt\n}\n"
  }
};
})();
(node as any).hash = 'd21850d49af37a798ce9cacad82ca4a2';
export default node;
