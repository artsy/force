/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerFollowButton_Test_QueryVariables = {
    id: string;
};
export type FairOrganizerFollowButton_Test_QueryResponse = {
    readonly fairOrganizer: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerFollowButton_fairOrganizer">;
    } | null;
};
export type FairOrganizerFollowButton_Test_Query = {
    readonly response: FairOrganizerFollowButton_Test_QueryResponse;
    readonly variables: FairOrganizerFollowButton_Test_QueryVariables;
};



/*
query FairOrganizerFollowButton_Test_Query(
  $id: String!
) {
  fairOrganizer(id: $id) {
    ...FairOrganizerFollowButton_fairOrganizer
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerFollowButton_Test_Query",
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
            "name": "FairOrganizerFollowButton_fairOrganizer"
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
    "name": "FairOrganizerFollowButton_Test_Query",
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
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "type": "FairOrganizer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.slug": (v3/*: any*/),
        "fairOrganizer.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.profile.id": (v3/*: any*/),
        "fairOrganizer.profile.internalID": (v3/*: any*/),
        "fairOrganizer.profile.isFollowed": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "FairOrganizerFollowButton_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerFollowButton_Test_Query(\n  $id: String!\n) {\n  fairOrganizer(id: $id) {\n    ...FairOrganizerFollowButton_fairOrganizer\n    id\n  }\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e786f3e32ea273cb52989dfa99e228fd';
export default node;
