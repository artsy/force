/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerHeader_Test_QueryVariables = {};
export type FairOrganizerHeader_Test_QueryResponse = {
    readonly fairOrganizer: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerHeader_fairOrganizer">;
    } | null;
};
export type FairOrganizerHeader_Test_Query = {
    readonly response: FairOrganizerHeader_Test_QueryResponse;
    readonly variables: FairOrganizerHeader_Test_QueryVariables;
};



/*
query FairOrganizerHeader_Test_Query {
  fairOrganizer(id: "example") {
    ...FairOrganizerHeader_fairOrganizer
    id
  }
}

fragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {
  slug
  name
  profile {
    id
    internalID
    isFollowed
  }
}

fragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {
  name
  profile {
    icon {
      desktop: cropped(width: 100, height: 100, version: "square140") {
        src
        srcSet
      }
      mobile: cropped(width: 60, height: 60, version: "square140") {
        src
        srcSet
      }
    }
    id
  }
}

fragment FairOrganizerHeader_fairOrganizer on FairOrganizer {
  name
  fairs: fairsConnection(first: 1) {
    edges {
      node {
        ...FairOrganizerTiming_fair
        id
      }
    }
  }
  ...FairOrganizerHeaderIcon_fairOrganizer
  ...FairOrganizerFollowButton_fairOrganizer
  ...FairOrganizerInfo_fairOrganizer
}

fragment FairOrganizerInfo_fairOrganizer on FairOrganizer {
  about(format: HTML)
}

fragment FairOrganizerTiming_fair on Fair {
  startAt
  exhibitionPeriod
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerHeader_fairOrganizer"
          }
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOrganizerHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": "fairs",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
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
                        "name": "startAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:1)"
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
                    "alias": "desktop",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 100
                      },
                      (v2/*: any*/),
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
                  },
                  {
                    "alias": "mobile",
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
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:60,version:\"square140\",width:60)"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
                "storageKey": null
              }
            ],
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
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "about",
            "storageKey": "about(format:\"HTML\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairOrganizerHeader_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerHeader_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...FairOrganizerHeader_fairOrganizer\n    id\n  }\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n\nfragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {\n  name\n  profile {\n    icon {\n      desktop: cropped(width: 100, height: 100, version: \"square140\") {\n        src\n        srcSet\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeader_fairOrganizer on FairOrganizer {\n  name\n  fairs: fairsConnection(first: 1) {\n    edges {\n      node {\n        ...FairOrganizerTiming_fair\n        id\n      }\n    }\n  }\n  ...FairOrganizerHeaderIcon_fairOrganizer\n  ...FairOrganizerFollowButton_fairOrganizer\n  ...FairOrganizerInfo_fairOrganizer\n}\n\nfragment FairOrganizerInfo_fairOrganizer on FairOrganizer {\n  about(format: HTML)\n}\n\nfragment FairOrganizerTiming_fair on Fair {\n  startAt\n  exhibitionPeriod\n}\n"
  }
};
})();
(node as any).hash = 'f3867ec2531d383171fb97126f738fb2';
export default node;
