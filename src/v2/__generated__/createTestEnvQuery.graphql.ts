/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type createTestEnvQueryVariables = {};
export type createTestEnvQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"createTestEnv_artwork">;
    } | null;
};
export type createTestEnvQueryRawResponse = {
    readonly artwork: ({
        readonly title: string | null;
        readonly artist: ({
            readonly name: string | null;
            readonly id: string;
        }) | null;
        readonly id: string;
    }) | null;
};
export type createTestEnvQuery = {
    readonly response: createTestEnvQueryResponse;
    readonly variables: createTestEnvQueryVariables;
    readonly rawResponse: createTestEnvQueryRawResponse;
};



/*
query createTestEnvQuery {
  artwork(id: "unused") {
    ...createTestEnv_artwork
    id
  }
}

fragment createTestEnv_artwork on Artwork {
  title
  artist {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "createTestEnvQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "createTestEnv_artwork"
          }
        ],
        "storageKey": "artwork(id:\"unused\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "createTestEnvQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "4b1d5d56fe44157d5741390cb8eba295",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.artist.id": (v2/*: any*/),
        "artwork.artist.name": (v3/*: any*/),
        "artwork.id": (v2/*: any*/),
        "artwork.title": (v3/*: any*/)
      }
    },
    "name": "createTestEnvQuery",
    "operationKind": "query",
    "text": "query createTestEnvQuery {\n  artwork(id: \"unused\") {\n    ...createTestEnv_artwork\n    id\n  }\n}\n\nfragment createTestEnv_artwork on Artwork {\n  title\n  artist {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '269f6794cf21b26557a57a6b61cc5864';
export default node;
