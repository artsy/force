/* tslint:disable */
/* eslint-disable */

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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
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
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneRelatedLinks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneRelatedLinks_gene"
          }
        ],
        "storageKey": "gene(id:\"cats\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GeneRelatedLinks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "GeneConnection",
            "kind": "LinkedField",
            "name": "similar",
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
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "similar(first:10)"
          },
          {
            "alias": "artists",
            "args": (v1/*: any*/),
            "concreteType": "ArtistConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistsConnection(first:10)"
          },
          (v2/*: any*/)
        ],
        "storageKey": "gene(id:\"cats\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "GeneRelatedLinks_Test_Query",
    "operationKind": "query",
    "text": "query GeneRelatedLinks_Test_Query {\n  gene(id: \"cats\") {\n    ...GeneRelatedLinks_gene\n    id\n  }\n}\n\nfragment GeneRelatedLinks_gene on Gene {\n  similar(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n  artists: artistsConnection(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8cb2f41c637fc5a0fe4761ff910f6d02';
export default node;
