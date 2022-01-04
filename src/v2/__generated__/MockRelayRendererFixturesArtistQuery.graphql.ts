/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesArtistQueryVariables = {
    id: string;
};
export type MockRelayRendererFixturesArtistQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"MockRelayRendererFixtures_artist">;
    } | null;
};
export type MockRelayRendererFixturesArtistQueryRawResponse = {
    readonly artist: ({
        readonly name: string | null;
        readonly id: string | null;
    }) | null;
};
export type MockRelayRendererFixturesArtistQuery = {
    readonly response: MockRelayRendererFixturesArtistQueryResponse;
    readonly variables: MockRelayRendererFixturesArtistQueryVariables;
    readonly rawResponse: MockRelayRendererFixturesArtistQueryRawResponse;
};



/*
query MockRelayRendererFixturesArtistQuery(
  $id: String!
) {
  artist(id: $id) {
    ...MockRelayRendererFixtures_artist
    id
  }
}

fragment MockRelayRendererFixtures_artist on Artist {
  name
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MockRelayRendererFixturesArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MockRelayRendererFixtures_artist"
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
    "name": "MockRelayRendererFixturesArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "name": "MockRelayRendererFixturesArtistQuery",
    "operationKind": "query",
    "text": "query MockRelayRendererFixturesArtistQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    ...MockRelayRendererFixtures_artist\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artist on Artist {\n  name\n}\n"
  }
};
})();
(node as any).hash = '8c4a637a093bfbe6fe9591999d35c879';
export default node;
