/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowGeneInput = {
    clientMutationId?: string | null;
    geneID?: string | null;
    unfollow?: boolean | null;
};
export type SuggestedGenesFollowGeneMutationVariables = {
    input: FollowGeneInput;
    excludedGeneIds: Array<string | null>;
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
                                readonly url: string;
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowGeneInput!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "excludedGeneIds",
    "type": "[String]!"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
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
          "selections": [
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
              "name": "internalID",
              "storageKey": null
            },
            (v2/*: any*/),
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
                      "value": 100
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 100
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
                      "name": "url",
                      "storageKey": null
                    }
                  ],
                  "storageKey": "cropped(height:100,width:100)"
                }
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SuggestedGenesFollowGeneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowGenePayload",
        "kind": "LinkedField",
        "name": "followGene",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "gene",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SuggestedGenesFollowGeneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowGenePayload",
        "kind": "LinkedField",
        "name": "followGene",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "gene",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SuggestedGenesFollowGeneMutation",
    "operationKind": "mutation",
    "text": "mutation SuggestedGenesFollowGeneMutation(\n  $input: FollowGeneInput!\n  $excludedGeneIds: [String]!\n) {\n  followGene(input: $input) {\n    gene {\n      similar(first: 1, excludeGeneIDs: $excludedGeneIds) {\n        edges {\n          node {\n            slug\n            internalID\n            id\n            name\n            image {\n              cropped(width: 100, height: 100) {\n                url\n              }\n            }\n          }\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0618468a113715e1372e4da80e9af468';
export default node;
