/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type exampleRoutes_ArtworkQueryVariables = {
    slug: string;
};
export type exampleRoutes_ArtworkQueryResponse = {
    readonly artwork: {
        readonly id: string;
    } | null;
};
export type exampleRoutes_ArtworkQuery = {
    readonly response: exampleRoutes_ArtworkQueryResponse;
    readonly variables: exampleRoutes_ArtworkQueryVariables;
};



/*
query exampleRoutes_ArtworkQuery(
  $slug: String!
) {
  artwork(id: $slug) {
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
    "concreteType": "Artwork",
    "kind": "LinkedField",
    "name": "artwork",
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
    "name": "exampleRoutes_ArtworkQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "exampleRoutes_ArtworkQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_ArtworkQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ArtworkQuery(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '107019a40c4b388113557a5b0c70e9fc';
export default node;
