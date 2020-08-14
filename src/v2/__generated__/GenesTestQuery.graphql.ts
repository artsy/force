/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GenesTestQueryVariables = {};
export type GenesTestQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"Genes_artist">;
    } | null;
};
export type GenesTestQueryRawResponse = {
    readonly artist: ({
        readonly related: ({
            readonly genes: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly href: string | null;
                        readonly name: string | null;
                        readonly id: string | null;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type GenesTestQuery = {
    readonly response: GenesTestQueryResponse;
    readonly variables: GenesTestQueryVariables;
    readonly rawResponse: GenesTestQueryRawResponse;
};



/*
query GenesTestQuery {
  artist(id: "whatevs") {
    ...Genes_artist
    id
  }
}

fragment Genes_artist on Artist {
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
    "value": "whatevs"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GenesTestQuery",
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
            "name": "Genes_artist"
          }
        ],
        "storageKey": "artist(id:\"whatevs\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GenesTestQuery",
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
        "storageKey": "artist(id:\"whatevs\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "GenesTestQuery",
    "operationKind": "query",
    "text": "query GenesTestQuery {\n  artist(id: \"whatevs\") {\n    ...Genes_artist\n    id\n  }\n}\n\nfragment Genes_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5c089c574dd81f9ef817ad618c24af50';
export default node;
