/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type GeneSearchResultsFollowGeneMutationVariables = {
    readonly input: {
        readonly gene_id: string | null;
        readonly clientMutationId: string | null;
    };
    readonly excludedGeneIds: ReadonlyArray<string | null>;
};
export type GeneSearchResultsFollowGeneMutationResponse = {
    readonly followGene: ({
        readonly gene: ({
            readonly similar: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly id: string;
                        readonly _id: string;
                        readonly __id: string;
                        readonly name: string | null;
                        readonly image: ({
                            readonly cropped: ({
                                readonly url: string | null;
                            }) | null;
                        }) | null;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
    }) | null;
};



/*
mutation GeneSearchResultsFollowGeneMutation(
  $input: FollowGeneInput!
  $excludedGeneIds: [String]!
) {
  followGene(input: $input) {
    gene {
      similar(first: 1, exclude_gene_ids: $excludedGeneIds) {
        edges {
          node {
            id
            _id
            __id
            name
            image {
              cropped(width: 100, height: 100) {
                url
              }
            }
          }
        }
      }
      __id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowGeneInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "excludedGeneIds",
    "type": "[String]!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "followGene",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "FollowGeneInput!"
      }
    ],
    "concreteType": "FollowGenePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gene",
        "storageKey": null,
        "args": null,
        "concreteType": "Gene",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "similar",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "exclude_gene_ids",
                "variableName": "excludedGeneIds",
                "type": "[String]"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 1,
                "type": "Int"
              }
            ],
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
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "_id",
                        "args": null,
                        "storageKey": null
                      },
                      v1,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "name",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "cropped",
                            "storageKey": "cropped(height:100,width:100)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 100,
                                "type": "Int!"
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 100,
                                "type": "Int!"
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "url",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          v1
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "GeneSearchResultsFollowGeneMutation",
  "id": null,
  "text": "mutation GeneSearchResultsFollowGeneMutation(\n  $input: FollowGeneInput!\n  $excludedGeneIds: [String]!\n) {\n  followGene(input: $input) {\n    gene {\n      similar(first: 1, exclude_gene_ids: $excludedGeneIds) {\n        edges {\n          node {\n            id\n            _id\n            __id\n            name\n            image {\n              cropped(width: 100, height: 100) {\n                url\n              }\n            }\n          }\n        }\n      }\n      __id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "GeneSearchResultsFollowGeneMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "GeneSearchResultsFollowGeneMutation",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
(node as any).hash = '3d621343f23280ba5000ed5cb3e9da08';
export default node;
