/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type RouterQueryVariables = {
    artistID: string;
};
export type RouterQueryResponse = {
    readonly artist: {
        readonly name: string | null;
        readonly bio: string | null;
    } | null;
};
export type RouterQuery = {
    readonly response: RouterQueryResponse;
    readonly variables: RouterQueryVariables;
};



/*
query RouterQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    name
    bio
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "bio",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RouterQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RouterQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RouterQuery",
    "id": null,
    "text": "query RouterQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    name\n    bio\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '77c943d093be0b5dd2cdad6a932bbb9e';
export default node;
