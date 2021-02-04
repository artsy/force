/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type geneRoutes_GeneShowQueryVariables = {
    slug: string;
};
export type geneRoutes_GeneShowQueryResponse = {
    readonly gene: {
        readonly " $fragmentRefs": FragmentRefs<"GeneShow_gene">;
    } | null;
};
export type geneRoutes_GeneShowQuery = {
    readonly response: geneRoutes_GeneShowQueryResponse;
    readonly variables: geneRoutes_GeneShowQueryVariables;
};



/*
query geneRoutes_GeneShowQuery(
  $slug: String!
) {
  gene(id: $slug) @principalField {
    ...GeneShow_gene
    id
  }
}

fragment GeneMeta_gene on Gene {
  name
  href
  description
  image {
    cropped(width: 1200, height: 630) {
      src
    }
  }
}

fragment GeneShow_gene on Gene {
  ...GeneMeta_gene
  name
  description
  similar(first: 10) {
    edges {
      node {
        internalID
        name
        id
      }
    }
  }
  artistsConnection(first: 10) {
    edges {
      node {
        internalID
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
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  (v2/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "geneRoutes_GeneShowQuery",
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
            "name": "GeneShow_gene"
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
    "name": "geneRoutes_GeneShowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 630
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1200
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:630,width:1200)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
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
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "similar(first:10)"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
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
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistsConnection(first:10)"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "geneRoutes_GeneShowQuery",
    "operationKind": "query",
    "text": "query geneRoutes_GeneShowQuery(\n  $slug: String!\n) {\n  gene(id: $slug) @principalField {\n    ...GeneShow_gene\n    id\n  }\n}\n\nfragment GeneMeta_gene on Gene {\n  name\n  href\n  description\n  image {\n    cropped(width: 1200, height: 630) {\n      src\n    }\n  }\n}\n\nfragment GeneShow_gene on Gene {\n  ...GeneMeta_gene\n  name\n  description\n  similar(first: 10) {\n    edges {\n      node {\n        internalID\n        name\n        id\n      }\n    }\n  }\n  artistsConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f0054fa7b90bc66c38eef2b99ba3247a';
export default node;
