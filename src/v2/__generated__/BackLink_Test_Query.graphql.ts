/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackLink_Test_QueryVariables = {};
export type BackLink_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"BackLink_artist">;
    } | null;
};
export type BackLink_Test_Query = {
    readonly response: BackLink_Test_QueryResponse;
    readonly variables: BackLink_Test_QueryVariables;
};



/*
query BackLink_Test_Query {
  artist(id: "example") {
    ...BackLink_artist
    id
  }
}

fragment BackLink_artist on Artist {
  name
  slug
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BackLink_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BackLink_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BackLink_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "abb7344101fff911d425adadeec5d980",
    "id": null,
    "metadata": {},
    "name": "BackLink_Test_Query",
    "operationKind": "query",
    "text": "query BackLink_Test_Query {\n  artist(id: \"example\") {\n    ...BackLink_artist\n    id\n  }\n}\n\nfragment BackLink_artist on Artist {\n  name\n  slug\n}\n"
  }
};
})();
(node as any).hash = '4087705b26dc52854bdbad9e271aab56';
export default node;
