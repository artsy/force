/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneEntityHeaderStoryQueryVariables = {
    id: string;
};
export type GeneEntityHeaderStoryQueryResponse = {
    readonly gene: {
        readonly " $fragmentRefs": FragmentRefs<"GeneEntityHeader_gene">;
    } | null;
};
export type GeneEntityHeaderStoryQuery = {
    readonly response: GeneEntityHeaderStoryQueryResponse;
    readonly variables: GeneEntityHeaderStoryQueryVariables;
};



/*
query GeneEntityHeaderStoryQuery(
  $id: String!
) {
  gene(id: $id) {
    ...GeneEntityHeader_gene
    id
  }
}

fragment FollowGeneButton_gene on Gene {
  id
  slug
  name
  internalID
  isFollowed
}

fragment GeneEntityHeader_gene on Gene {
  ...FollowGeneButton_gene
  internalID
  href
  name
  avatar: image {
    cropped(width: 45, height: 45, version: ["big_and_tall", "tall"]) {
      src
      srcSet
    }
  }
  filterArtworksConnection(first: 1) {
    counts {
      total
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneEntityHeaderStoryQuery",
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
            "name": "GeneEntityHeader_gene"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneEntityHeaderStoryQuery",
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
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": "avatar",
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
                    "value": 45
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "big_and_tall",
                      "tall"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 45
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:45,version:[\"big_and_tall\",\"tall\"],width:45)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:1)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7e6686d25bef38ca09e937355240ec98",
    "id": null,
    "metadata": {},
    "name": "GeneEntityHeaderStoryQuery",
    "operationKind": "query",
    "text": "query GeneEntityHeaderStoryQuery(\n  $id: String!\n) {\n  gene(id: $id) {\n    ...GeneEntityHeader_gene\n    id\n  }\n}\n\nfragment FollowGeneButton_gene on Gene {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n}\n\nfragment GeneEntityHeader_gene on Gene {\n  ...FollowGeneButton_gene\n  internalID\n  href\n  name\n  avatar: image {\n    cropped(width: 45, height: 45, version: [\"big_and_tall\", \"tall\"]) {\n      src\n      srcSet\n    }\n  }\n  filterArtworksConnection(first: 1) {\n    counts {\n      total\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '399b25f48c1cf121a67de450c02dcc23';
export default node;
