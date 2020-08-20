/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_FairSubAppQueryVariables = {
    slug: string;
};
export type routes_FairSubAppQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairSubApp_fair">;
    } | null;
};
export type routes_FairSubAppQuery = {
    readonly response: routes_FairSubAppQueryResponse;
    readonly variables: routes_FairSubAppQueryVariables;
};



/*
query routes_FairSubAppQuery(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairSubApp_fair
    id
  }
}

fragment FairSubApp_fair on Fair {
  id
  name
  slug
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_FairSubAppQuery",
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
            "name": "FairSubApp_fair"
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
    "name": "routes_FairSubAppQuery",
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
            "name": "id",
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
            "kind": "ScalarField",
            "name": "slug",
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
    "name": "routes_FairSubAppQuery",
    "operationKind": "query",
    "text": "query routes_FairSubAppQuery(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairSubApp_fair\n    id\n  }\n}\n\nfragment FairSubApp_fair on Fair {\n  id\n  name\n  slug\n}\n"
  }
};
})();
(node as any).hash = 'ec9bac122b91b1082956c853bae8a34a';
export default node;
