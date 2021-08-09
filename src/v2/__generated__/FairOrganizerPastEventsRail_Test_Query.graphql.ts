/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerPastEventsRail_Test_QueryVariables = {
    slug: string;
};
export type FairOrganizerPastEventsRail_Test_QueryResponse = {
    readonly fairs: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerPastEventsRail_fairs">;
    } | null;
};
export type FairOrganizerPastEventsRail_Test_Query = {
    readonly response: FairOrganizerPastEventsRail_Test_QueryResponse;
    readonly variables: FairOrganizerPastEventsRail_Test_QueryVariables;
};



/*
query FairOrganizerPastEventsRail_Test_Query(
  $slug: String!
) {
  fairs: fairsConnection(fairOrganizerID: $slug) {
    ...FairOrganizerPastEventsRail_fairs
  }
}

fragment FairOrganizerPastEventRailCell_fair on Fair {
  slug
  name
  image {
    cropped(width: 325, height: 244) {
      width
      height
      src
      srcSet
    }
  }
}

fragment FairOrganizerPastEventsRail_fairs on FairConnection {
  edges {
    node {
      id
      ...FairOrganizerPastEventRailCell_fair
    }
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
    "name": "fairOrganizerID",
    "variableName": "slug"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerPastEventsRail_Test_Query",
    "selections": [
      {
        "alias": "fairs",
        "args": (v1/*: any*/),
        "concreteType": "FairConnection",
        "kind": "LinkedField",
        "name": "fairsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerPastEventsRail_fairs"
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
    "name": "FairOrganizerPastEventsRail_Test_Query",
    "selections": [
      {
        "alias": "fairs",
        "args": (v1/*: any*/),
        "concreteType": "FairConnection",
        "kind": "LinkedField",
        "name": "fairsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FairEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Fair",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
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
                    "kind": "ScalarField",
                    "name": "name",
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
                            "value": 244
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 325
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": [
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
                        "storageKey": "cropped(height:244,width:325)"
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
    "id": null,
    "metadata": {},
    "name": "FairOrganizerPastEventsRail_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerPastEventsRail_Test_Query(\n  $slug: String!\n) {\n  fairs: fairsConnection(fairOrganizerID: $slug) {\n    ...FairOrganizerPastEventsRail_fairs\n  }\n}\n\nfragment FairOrganizerPastEventRailCell_fair on Fair {\n  slug\n  name\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerPastEventsRail_fairs on FairConnection {\n  edges {\n    node {\n      id\n      ...FairOrganizerPastEventRailCell_fair\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3183a2ac445876ba5d8dc61338f6b04c';
export default node;
