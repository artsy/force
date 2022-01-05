/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistGenes_Test_QueryVariables = {};
export type ArtistGenes_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistGenes_artist">;
    } | null;
};
export type ArtistGenes_Test_Query = {
    readonly response: ArtistGenes_Test_QueryResponse;
    readonly variables: ArtistGenes_Test_QueryVariables;
};



/*
query ArtistGenes_Test_Query {
  artist(id: "example") {
    ...ArtistGenes_artist
    id
  }
}

fragment ArtistGenes_artist on Artist {
  related {
    genes {
      edges {
        node {
          href
          name
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
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
    "name": "ArtistGenes_Test_Query",
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
            "name": "ArtistGenes_artist"
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
    "name": "ArtistGenes_Test_Query",
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
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          },
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
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
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
        "artist.id": (v2/*: any*/),
        "artist.related": {
          "type": "ArtistRelatedData",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.genes": {
          "type": "GeneConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.genes.edges": {
          "type": "GeneEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.related.genes.edges.node": {
          "type": "Gene",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.genes.edges.node.href": (v3/*: any*/),
        "artist.related.genes.edges.node.name": (v3/*: any*/),
        "artist.related.genes.edges.node.id": (v2/*: any*/)
      }
    },
    "name": "ArtistGenes_Test_Query",
    "operationKind": "query",
    "text": "query ArtistGenes_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistGenes_artist\n    id\n  }\n}\n\nfragment ArtistGenes_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'efd1d0624e66e48949097221e0d1f5e5';
export default node;
