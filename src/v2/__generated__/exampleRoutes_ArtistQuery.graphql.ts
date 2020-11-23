/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type exampleRoutes_ArtistQueryVariables = {
    slug: string;
};
export type exampleRoutes_ArtistQueryResponse = {
    readonly artist: {
        readonly id: string;
    } | null;
};
export type exampleRoutes_ArtistQuery = {
    readonly response: exampleRoutes_ArtistQueryResponse;
    readonly variables: exampleRoutes_ArtistQueryVariables;
};



/*
query exampleRoutes_ArtistQuery(
  $slug: String!
) {
  artist(id: $slug) {
    id
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "slug"
      }
    ],
    "concreteType": "Artist",
    "kind": "LinkedField",
    "name": "artist",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "exampleRoutes_ArtistQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "exampleRoutes_ArtistQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_ArtistQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ArtistQuery(\n  $slug: String!\n) {\n  artist(id: $slug) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3826002b15d728861d5df9e0d6b8f537';
export default node;
