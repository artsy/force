/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairOrganizerRoutes_QueryVariables = {
    slug: string;
};
export type fairOrganizerRoutes_QueryResponse = {
    readonly fairOrganizer: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
    } | null;
};
export type fairOrganizerRoutes_Query = {
    readonly response: fairOrganizerRoutes_QueryResponse;
    readonly variables: fairOrganizerRoutes_QueryVariables;
};



/*
query fairOrganizerRoutes_Query(
  $slug: String!
) {
  fairOrganizer(id: $slug) {
    ...FairOrganizerApp_fairOrganizer
    id
  }
}

fragment FairOrganizerApp_fairOrganizer on FairOrganizer {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fairOrganizerRoutes_Query",
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
    "name": "fairOrganizerRoutes_Query",
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
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "fairOrganizerRoutes_Query",
    "operationKind": "query",
    "text": "query fairOrganizerRoutes_Query(\n  $slug: String!\n) {\n  fairOrganizer(id: $slug) {\n    ...FairOrganizerApp_fairOrganizer\n    id\n  }\n}\n\nfragment FairOrganizerApp_fairOrganizer on FairOrganizer {\n  ...FairOrganizerFollowButton_fairOrganizer\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n"
  }
};
})();
(node as any).hash = '21e50cb3971b185f44955e4900cc839c';
export default node;
