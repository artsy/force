/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneRelatedLinksQueryVariables = {
    geneID: string;
};
export type GeneRelatedLinksQueryResponse = {
    readonly gene: {
        readonly " $fragmentRefs": FragmentRefs<"GeneRelatedLinks_gene">;
    } | null;
};
export type GeneRelatedLinksQuery = {
    readonly response: GeneRelatedLinksQueryResponse;
    readonly variables: GeneRelatedLinksQueryVariables;
};



/*
query GeneRelatedLinksQuery(
  $geneID: String!
) {
  gene(id: $geneID) {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "geneID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "geneID"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
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
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneRelatedLinksQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneRelatedLinksQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                    "selections": (v4/*: any*/),
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
            "args": (v2/*: any*/),
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
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistsConnection(first:10)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "GeneRelatedLinksQuery",
    "operationKind": "query",
    "text": "query GeneRelatedLinksQuery(\n  $geneID: String!\n) {\n  gene(id: $geneID) {\n    ...GeneRelatedLinks_gene\n    id\n  }\n}\n\nfragment GeneRelatedLinks_gene on Gene {\n  similar(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n  artists: artistsConnection(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5eed777d3dbca83e395937c6eb8489ae';
export default node;
