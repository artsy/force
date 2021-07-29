/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerFollowButton_Test_QueryVariables = {
    id: string;
};
export type FairOrganizerFollowButton_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerFollowButton_fair">;
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
  fair(id: $id) {
    ...FairOrganizerFollowButton_fair
    id
  }
}

fragment FairOrganizerFollowButton_fair on Fair {
  id
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
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerFollowButton_fair"
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
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairOrganizerFollowButton_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerFollowButton_Test_Query(\n  $id: String!\n) {\n  fair(id: $id) {\n    ...FairOrganizerFollowButton_fair\n    id\n  }\n}\n\nfragment FairOrganizerFollowButton_fair on Fair {\n  id\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n"
  }
};
})();
(node as any).hash = '6d2d4fc2baf6eb9949fb60b449caf938';
export default node;
