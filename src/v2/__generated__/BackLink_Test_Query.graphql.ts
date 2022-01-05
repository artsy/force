/* tslint:disable */
/* eslint-disable */

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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        }
      }
    },
    "name": "BackLink_Test_Query",
    "operationKind": "query",
    "text": "query BackLink_Test_Query {\n  artist(id: \"example\") {\n    ...BackLink_artist\n    id\n  }\n}\n\nfragment BackLink_artist on Artist {\n  name\n  slug\n}\n"
  }
};
})();
(node as any).hash = '857fa2bb422c485fa6892edd4832e014';
export default node;
