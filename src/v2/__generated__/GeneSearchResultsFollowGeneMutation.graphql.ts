/**
 * @generated SignedSource<<bf00f5d2e6c84f2d031daea9bedb8521>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowGeneInput = {
  clientMutationId?: string | null;
  geneID?: string | null;
  unfollow?: boolean | null;
};
export type GeneSearchResultsFollowGeneMutation$variables = {
  input: FollowGeneInput;
  excludedGeneIds: ReadonlyArray<string | null>;
};
export type GeneSearchResultsFollowGeneMutation$data = {
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
export type GeneSearchResultsFollowGeneMutation = {
  variables: GeneSearchResultsFollowGeneMutation$variables;
  response: GeneSearchResultsFollowGeneMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "excludedGeneIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
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
            (v3/*: any*/),
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneSearchResultsFollowGeneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "GeneSearchResultsFollowGeneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
              (v4/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c496b12f0b93637c9f84c138405034a5",
    "id": null,
    "metadata": {},
    "name": "GeneSearchResultsFollowGeneMutation",
    "operationKind": "mutation",
    "text": "mutation GeneSearchResultsFollowGeneMutation(\n  $input: FollowGeneInput!\n  $excludedGeneIds: [String]!\n) {\n  followGene(input: $input) {\n    gene {\n      similar(first: 1, excludeGeneIDs: $excludedGeneIds) {\n        edges {\n          node {\n            slug\n            internalID\n            id\n            name\n            image {\n              cropped(width: 100, height: 100) {\n                url\n              }\n            }\n          }\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "391d6f9a614b00601a42d5ca2179ed37";

export default node;
