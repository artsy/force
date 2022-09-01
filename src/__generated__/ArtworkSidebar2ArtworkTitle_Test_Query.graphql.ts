/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2ArtworkTitle_Test_QueryVariables = {};
export type ArtworkSidebar2ArtworkTitle_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2ArtworkTitle_artwork">;
    } | null;
};
export type ArtworkSidebar2ArtworkTitle_Test_Query = {
    readonly response: ArtworkSidebar2ArtworkTitle_Test_QueryResponse;
    readonly variables: ArtworkSidebar2ArtworkTitle_Test_QueryVariables;
};



/*
query ArtworkSidebar2ArtworkTitle_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebar2ArtworkTitle_artwork
    id
  }
}

fragment ArtworkSidebar2ArtworkTitle_artwork on Artwork {
  date
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
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
    "name": "ArtworkSidebar2ArtworkTitle_Test_Query",
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
            "name": "ArtworkSidebar2ArtworkTitle_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebar2ArtworkTitle_Test_Query",
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
            "name": "date",
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "2e9cdbf5cb1a0efcf8d88e5dbdc82676",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.date": (v1/*: any*/),
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.title": (v1/*: any*/)
      }
    },
    "name": "ArtworkSidebar2ArtworkTitle_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar2ArtworkTitle_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar2ArtworkTitle_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebar2ArtworkTitle_artwork on Artwork {\n  date\n  title\n}\n"
  }
};
})();
(node as any).hash = 'ad4e9d86243eb0b06c621a1578538a29';
export default node;
