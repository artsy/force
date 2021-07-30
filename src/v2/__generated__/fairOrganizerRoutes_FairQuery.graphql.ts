/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairOrganizerRoutes_FairQueryVariables = {
    slug: string;
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
  $slug: String!
) {
  fair(id: $slug) {
    ...FairOrganizerApp_fair
    id
  }
}

fragment FairOrganizerApp_fair on Fair {
  ...FairOrganizerFollowButton_fair
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
    "name": "fairOrganizerRoutes_FairQuery",
    "operationKind": "query",
    "text": "query fairOrganizerRoutes_FairQuery(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairOrganizerApp_fair\n    id\n  }\n}\n\nfragment FairOrganizerApp_fair on Fair {\n  ...FairOrganizerFollowButton_fair\n}\n\nfragment FairOrganizerFollowButton_fair on Fair {\n  id\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n"
  }
};
})();
(node as any).hash = '94ebecf8cdf2e5e663a32f6024e4e61d';
export default node;
