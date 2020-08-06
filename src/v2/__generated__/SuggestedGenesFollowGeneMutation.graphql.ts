/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowGeneInput = {
    readonly clientMutationId?: string | null;
    readonly geneID?: string | null;
};
export type SuggestedGenesFollowGeneMutationVariables = {
    input: FollowGeneInput;
    excludedGeneIds: ReadonlyArray<string | null>;
};
export type SuggestedGenesFollowGeneMutationResponse = {
    readonly followGene: {
        readonly gene: {
            readonly similar: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly slug: string;
                        readonly internalID: string;
                        readonly id: string;
                        readonly name: string | null;
                        readonly image: {
                            readonly cropped: {
                                readonly url: string | null;
                            } | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type SuggestedGenesFollowGeneMutation = {
    readonly response: SuggestedGenesFollowGeneMutationResponse;
    readonly variables: SuggestedGenesFollowGeneMutationVariables;
};



/*
mutation SuggestedGenesFollowGeneMutation(
  $input: FollowGeneInput!
  $excludedGeneIds: [String]!
) {
  followGene(input: $input) {
    gene {
      similar(first: 1, excludeGeneIDs: $excludedGeneIds) {
        edges {
          node {
            slug
            internalID
            id
            name
            image {
              cropped(width: 100, height: 100) {
                url
              }
            }
          }
        }
      }
      id
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
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "similar",
  "storageKey": null,
  "args": [
    {
      "kind": "Variable",
      "name": "excludeGeneIDs",
      "variableName": "excludedGeneIds"
    },
    {
      "kind": "Literal",
      "name": "first",
      "value": 1
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
              "name": "slug",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "internalID",
              "args": null,
              "storageKey": null
            },
            (v2/*: any*/),
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
                      "value": 100
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 100
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SuggestedGenesFollowGeneMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followGene",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SuggestedGenesFollowGeneMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followGene",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v3/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "SuggestedGenesFollowGeneMutation",
    "id": null,
    "text": "mutation SuggestedGenesFollowGeneMutation(\n  $input: FollowGeneInput!\n  $excludedGeneIds: [String]!\n) {\n  followGene(input: $input) {\n    gene {\n      similar(first: 1, excludeGeneIDs: $excludedGeneIds) {\n        edges {\n          node {\n            slug\n            internalID\n            id\n            name\n            image {\n              cropped(width: 100, height: 100) {\n                url\n              }\n            }\n          }\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '0618468a113715e1372e4da80e9af468';
export default node;
