/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreateArtworkAlertSection_Test_QueryVariables = {};
export type CreateArtworkAlertSection_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"CreateArtworkAlertSection_artwork">;
    } | null;
};
export type CreateArtworkAlertSection_Test_Query = {
    readonly response: CreateArtworkAlertSection_Test_QueryResponse;
    readonly variables: CreateArtworkAlertSection_Test_QueryVariables;
};



/*
query CreateArtworkAlertSection_Test_Query {
  artwork(id: "test-artwork-id") {
    ...CreateArtworkAlertSection_artwork
    id
  }
}

fragment CreateArtworkAlertSection_artwork on Artwork {
  title
  artists {
    internalID
    name
    slug
    id
  }
  attributionClass {
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
    "value": "test-artwork-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
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
    "name": "CreateArtworkAlertSection_Test_Query",
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
            "name": "CreateArtworkAlertSection_artwork"
          }
        ],
        "storageKey": "artwork(id:\"test-artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateArtworkAlertSection_Test_Query",
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
            "name": "artists",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"test-artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "9c3b90039e00a0321833c661e6f5b18b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v3/*: any*/),
        "artwork.artists.internalID": (v3/*: any*/),
        "artwork.artists.name": (v4/*: any*/),
        "artwork.artists.slug": (v3/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v3/*: any*/),
        "artwork.attributionClass.name": (v4/*: any*/),
        "artwork.id": (v3/*: any*/),
        "artwork.title": (v4/*: any*/)
      }
    },
    "name": "CreateArtworkAlertSection_Test_Query",
    "operationKind": "query",
    "text": "query CreateArtworkAlertSection_Test_Query {\n  artwork(id: \"test-artwork-id\") {\n    ...CreateArtworkAlertSection_artwork\n    id\n  }\n}\n\nfragment CreateArtworkAlertSection_artwork on Artwork {\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8f1fa8f57352b417d20e89451adb83f9';
export default node;
