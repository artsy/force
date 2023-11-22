/**
 * @generated SignedSource<<b094819d4673064acd73fe3c18c6fc6d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesArtistQuery$variables = {
  id: string;
};
export type MockRelayRendererFixturesArtistQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"MockRelayRendererFixtures_artist">;
  } | null | undefined;
};
export type MockRelayRendererFixturesArtistQuery$rawResponse = {
  readonly artist: {
    readonly id: string;
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type MockRelayRendererFixturesArtistQuery = {
  rawResponse: MockRelayRendererFixturesArtistQuery$rawResponse;
  response: MockRelayRendererFixturesArtistQuery$data;
  variables: MockRelayRendererFixturesArtistQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
    "type": "Query",
    "abstractKey": null
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
    "cacheID": "cbf4686647f004d150e5f1a608cbe861",
    "id": null,
    "metadata": {},
    "name": "MockRelayRendererFixturesArtistQuery",
    "operationKind": "query",
    "text": "query MockRelayRendererFixturesArtistQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    ...MockRelayRendererFixtures_artist\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artist on Artist {\n  name\n}\n"
  }
};
})();

(node as any).hash = "8c4a637a093bfbe6fe9591999d35c879";

export default node;
