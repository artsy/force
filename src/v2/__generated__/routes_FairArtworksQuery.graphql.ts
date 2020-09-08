/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_FairArtworksQueryVariables = {
    slug: string;
};
export type routes_FairArtworksQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairArtworks_fair">;
    } | null;
};
export type routes_FairArtworksQuery = {
    readonly response: routes_FairArtworksQueryResponse;
    readonly variables: routes_FairArtworksQueryVariables;
};



/*
query routes_FairArtworksQuery(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairArtworks_fair
    id
  }
}

fragment FairArtworks_fair on Fair {
  id
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
    "name": "routes_FairArtworksQuery",
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
            "name": "FairArtworks_fair"
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
    "name": "routes_FairArtworksQuery",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "routes_FairArtworksQuery",
    "operationKind": "query",
    "text": "query routes_FairArtworksQuery(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairArtworks_fair\n    id\n  }\n}\n\nfragment FairArtworks_fair on Fair {\n  id\n}\n"
  }
};
})();
(node as any).hash = '393f09e2ef66606df3d2dfe83427e686';
export default node;
