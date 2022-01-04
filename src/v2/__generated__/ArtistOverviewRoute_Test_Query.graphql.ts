/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_Test_QueryVariables = {};
export type ArtistOverviewRoute_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistOverviewRoute_artist">;
    } | null;
};
export type ArtistOverviewRoute_Test_Query = {
    readonly response: ArtistOverviewRoute_Test_QueryResponse;
    readonly variables: ArtistOverviewRoute_Test_QueryVariables;
};



/*
query ArtistOverviewRoute_Test_Query {
  artist(id: "test") {
    ...ArtistOverviewRoute_artist
    id
  }
}

fragment ArtistOverviewRoute_artist on Artist {
  slug
  name
  counts {
    artworks
  }
  internalID
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistOverviewRoute_Test_Query",
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
            "name": "ArtistOverviewRoute_artist"
          }
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistOverviewRoute_Test_Query",
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
            "name": "slug",
            "storageKey": null
          },
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
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
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
        "storageKey": "artist(id:\"test\")"
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
        "artist.slug": (v1/*: any*/),
        "artist.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.counts": {
          "type": "ArtistCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.internalID": (v1/*: any*/),
        "artist.counts.artworks": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "ArtistOverviewRoute_Test_Query",
    "operationKind": "query",
    "text": "query ArtistOverviewRoute_Test_Query {\n  artist(id: \"test\") {\n    ...ArtistOverviewRoute_artist\n    id\n  }\n}\n\nfragment ArtistOverviewRoute_artist on Artist {\n  slug\n  name\n  counts {\n    artworks\n  }\n  internalID\n}\n"
  }
};
})();
(node as any).hash = '7946d8b3859ab901fa36998f89fe62bd';
export default node;
