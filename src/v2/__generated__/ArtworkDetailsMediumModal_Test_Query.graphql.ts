/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsMediumModal_Test_QueryVariables = {};
export type ArtworkDetailsMediumModal_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsMediumModal_artwork">;
    } | null;
};
export type ArtworkDetailsMediumModal_Test_Query = {
    readonly response: ArtworkDetailsMediumModal_Test_QueryResponse;
    readonly variables: ArtworkDetailsMediumModal_Test_QueryVariables;
};



/*
query ArtworkDetailsMediumModal_Test_Query {
  artwork(id: "xxx") {
    ...ArtworkDetailsMediumModal_artwork
    id
  }
}

fragment ArtworkDetailsMediumModal_artwork on Artwork {
  mediumType {
    name
    longDescription
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
v1 = {
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
    "name": "ArtworkDetailsMediumModal_Test_Query",
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
            "name": "ArtworkDetailsMediumModal_artwork"
          }
        ],
        "storageKey": "artwork(id:\"xxx\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkDetailsMediumModal_Test_Query",
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
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
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
                "name": "longDescription",
                "storageKey": null
              }
            ],
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
        "storageKey": "artwork(id:\"xxx\")"
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
        "artwork.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.mediumType": {
          "type": "ArtworkMedium",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.mediumType.name": (v1/*: any*/),
        "artwork.mediumType.longDescription": (v1/*: any*/)
      }
    },
    "name": "ArtworkDetailsMediumModal_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkDetailsMediumModal_Test_Query {\n  artwork(id: \"xxx\") {\n    ...ArtworkDetailsMediumModal_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n"
  }
};
})();
(node as any).hash = '43f502d0f85ba901ddd85297e7eba546';
export default node;
