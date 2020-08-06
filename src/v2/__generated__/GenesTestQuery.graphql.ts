/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GenesTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"whatevs\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Genes_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GenesTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"whatevs\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "related",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "genes",
                "storageKey": null,
                "args": null,
                "concreteType": "GeneConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Gene",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "href",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "name",
                            "args": null,
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GenesTestQuery",
    "id": null,
    "text": "query GenesTestQuery {\n  artist(id: \"whatevs\") {\n    ...Genes_artist\n    id\n  }\n}\n\nfragment Genes_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5c089c574dd81f9ef817ad618c24af50';
export default node;
