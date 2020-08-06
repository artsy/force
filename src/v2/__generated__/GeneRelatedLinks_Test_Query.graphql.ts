/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneRelatedLinks_Test_QueryVariables = {};
export type GeneRelatedLinks_Test_QueryResponse = {
    readonly gene: {
        readonly " $fragmentRefs": FragmentRefs<"GeneRelatedLinks_gene">;
    } | null;
};
export type GeneRelatedLinks_Test_QueryRawResponse = {
    readonly gene: ({
        readonly similar: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly href: string | null;
                    readonly name: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly artists: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly href: string | null;
                    readonly name: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type GeneRelatedLinks_Test_Query = {
    readonly response: GeneRelatedLinks_Test_QueryResponse;
    readonly variables: GeneRelatedLinks_Test_QueryVariables;
    readonly rawResponse: GeneRelatedLinks_Test_QueryRawResponse;
};



/*
query GeneRelatedLinks_Test_Query {
  gene(id: "cats") {
    ...GeneRelatedLinks_gene
    id
  }
}

fragment GeneRelatedLinks_gene on Gene {
  similar(first: 10) {
    edges {
      node {
        href
        name
        id
      }
    }
  }
  artists: artistsConnection(first: 10) {
    edges {
      node {
        href
        name
        id
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
    "value": "cats"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
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
  (v2/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GeneRelatedLinks_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gene",
        "storageKey": "gene(id:\"cats\")",
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "GeneRelatedLinks_gene",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GeneRelatedLinks_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gene",
        "storageKey": "gene(id:\"cats\")",
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "similar",
            "storageKey": "similar(first:10)",
            "args": (v1/*: any*/),
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
                    "selections": (v3/*: any*/)
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artists",
            "name": "artistsConnection",
            "storageKey": "artistsConnection(first:10)",
            "args": (v1/*: any*/),
            "concreteType": "ArtistConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artist",
                    "plural": false,
                    "selections": (v3/*: any*/)
                  }
                ]
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GeneRelatedLinks_Test_Query",
    "id": null,
    "text": "query GeneRelatedLinks_Test_Query {\n  gene(id: \"cats\") {\n    ...GeneRelatedLinks_gene\n    id\n  }\n}\n\nfragment GeneRelatedLinks_gene on Gene {\n  similar(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n  artists: artistsConnection(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '8cb2f41c637fc5a0fe4761ff910f6d02';
export default node;
