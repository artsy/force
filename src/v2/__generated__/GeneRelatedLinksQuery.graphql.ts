/* tslint:disable */

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
    "kind": "LocalArgument",
    "name": "geneID",
    "type": "String!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
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
  (v3/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GeneRelatedLinksQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gene",
        "storageKey": null,
        "args": (v1/*: any*/),
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
    "name": "GeneRelatedLinksQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gene",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "similar",
            "storageKey": "similar(first:10)",
            "args": (v2/*: any*/),
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
                    "selections": (v4/*: any*/)
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
            "args": (v2/*: any*/),
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
                    "selections": (v4/*: any*/)
                  }
                ]
              }
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GeneRelatedLinksQuery",
    "id": null,
    "text": "query GeneRelatedLinksQuery(\n  $geneID: String!\n) {\n  gene(id: $geneID) {\n    ...GeneRelatedLinks_gene\n    id\n  }\n}\n\nfragment GeneRelatedLinks_gene on Gene {\n  similar(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n  artists: artistsConnection(first: 10) {\n    edges {\n      node {\n        href\n        name\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5eed777d3dbca83e395937c6eb8489ae';
export default node;
