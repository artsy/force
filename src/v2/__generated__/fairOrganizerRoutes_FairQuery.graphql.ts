/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairOrganizerRoutes_FairQueryVariables = {
    id: string;
};
export type fairOrganizerRoutes_FairQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fair">;
    } | null;
};
export type fairOrganizerRoutes_FairQuery = {
    readonly response: fairOrganizerRoutes_FairQueryResponse;
    readonly variables: fairOrganizerRoutes_FairQueryVariables;
};



/*
query fairOrganizerRoutes_FairQuery(
  $id: String!
) {
  fair(id: $id) {
    ...FairOrganizerApp_fair
    id
  }
}

fragment FairOrganizerApp_fair on Fair {
  ...FairOrganizerFollowButton_fair
}

fragment FairOrganizerFollowButton_fair on Fair {
  id
  profile {
    internalID
    isFollowed
    id
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
    "name": "fairOrganizerRoutes_FairQuery",
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
            "name": "FairOrganizerApp_fair"
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
    "name": "fairOrganizerRoutes_FairQuery",
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
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
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
              },
              (v2/*: any*/)
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
    "name": "fairOrganizerRoutes_FairQuery",
    "operationKind": "query",
    "text": "query fairOrganizerRoutes_FairQuery(\n  $id: String!\n) {\n  fair(id: $id) {\n    ...FairOrganizerApp_fair\n    id\n  }\n}\n\nfragment FairOrganizerApp_fair on Fair {\n  ...FairOrganizerFollowButton_fair\n}\n\nfragment FairOrganizerFollowButton_fair on Fair {\n  id\n  profile {\n    internalID\n    isFollowed\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5717a5fda787eec19496e7b9ed5d178e';
export default node;
