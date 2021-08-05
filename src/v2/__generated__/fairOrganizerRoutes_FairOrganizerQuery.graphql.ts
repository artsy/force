/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairOrganizerRoutes_FairOrganizerQueryVariables = {
    slug: string;
};
export type fairOrganizerRoutes_FairOrganizerQueryResponse = {
    readonly fairOrganizer: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
    } | null;
};
export type fairOrganizerRoutes_FairOrganizerQuery = {
    readonly response: fairOrganizerRoutes_FairOrganizerQueryResponse;
    readonly variables: fairOrganizerRoutes_FairOrganizerQueryVariables;
};



/*
query fairOrganizerRoutes_FairOrganizerQuery(
  $slug: String!
) {
  fairOrganizer(id: $slug) @principalField {
    ...FairOrganizerApp_fairOrganizer
    id
  }
}

fragment FairHeaderImage_fair on Fair {
  image {
    url(version: "wide")
  }
}

fragment FairOrganizerApp_fairOrganizer on FairOrganizer {
  name
  fairs: fairsConnection(first: 1) {
    edges {
      node {
        ...FairHeaderImage_fair
        id
      }
    }
  }
  ...FairOrganizerHeader_fairOrganizer
  ...FairOrganizerFollowButton_fairOrganizer
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
  about
  fairs: fairsConnection(first: 1) {
    edges {
      node {
        ...FairOrganizerTiming_fair
        id
      }
    }
  }
  ...FairOrganizerHeaderIcon_fairOrganizer
}

fragment FairOrganizerTiming_fair on Fair {
  startAt
  isActive
  exhibitionPeriod
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v4 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fairOrganizerRoutes_FairOrganizerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerApp_fairOrganizer"
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
    "name": "fairOrganizerRoutes_FairOrganizerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                                "value": "wide"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"wide\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
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
                        "name": "isActive",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      }
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
            "kind": "ScalarField",
            "name": "about",
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
                    "alias": "desktop",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 100
                      },
                      (v3/*: any*/),
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
                    "selections": (v4/*: any*/),
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
                      (v3/*: any*/),
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
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/),
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "fairOrganizerRoutes_FairOrganizerQuery",
    "operationKind": "query",
    "text": "query fairOrganizerRoutes_FairOrganizerQuery(\n  $slug: String!\n) {\n  fairOrganizer(id: $slug) @principalField {\n    ...FairOrganizerApp_fairOrganizer\n    id\n  }\n}\n\nfragment FairHeaderImage_fair on Fair {\n  image {\n    url(version: \"wide\")\n  }\n}\n\nfragment FairOrganizerApp_fairOrganizer on FairOrganizer {\n  name\n  fairs: fairsConnection(first: 1) {\n    edges {\n      node {\n        ...FairHeaderImage_fair\n        id\n      }\n    }\n  }\n  ...FairOrganizerHeader_fairOrganizer\n  ...FairOrganizerFollowButton_fairOrganizer\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n\nfragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {\n  name\n  profile {\n    icon {\n      desktop: cropped(width: 100, height: 100, version: \"square140\") {\n        src\n        srcSet\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairOrganizerHeader_fairOrganizer on FairOrganizer {\n  name\n  about\n  fairs: fairsConnection(first: 1) {\n    edges {\n      node {\n        ...FairOrganizerTiming_fair\n        id\n      }\n    }\n  }\n  ...FairOrganizerHeaderIcon_fairOrganizer\n}\n\nfragment FairOrganizerTiming_fair on Fair {\n  startAt\n  isActive\n  exhibitionPeriod\n}\n"
  }
};
})();
(node as any).hash = '365d6d1efca3d3bc5489b193ca51cb87';
export default node;
