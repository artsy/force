/* tslint:disable */
/* eslint-disable */

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
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.id": (v2/*: any*/),
        "artwork.title": (v3/*: any*/),
        "artwork.artist": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.artist.name": (v3/*: any*/),
        "artwork.artist.id": (v2/*: any*/)
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
