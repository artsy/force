/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SuggestedGenes_Test_QueryVariables = {};
export type SuggestedGenes_Test_QueryResponse = {
    readonly highlights: {
        readonly suggested_genes: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"SuggestedGenes_suggested_genes">;
        } | null> | null;
    } | null;
};
export type SuggestedGenes_Test_Query = {
    readonly response: SuggestedGenes_Test_QueryResponse;
    readonly variables: SuggestedGenes_Test_QueryVariables;
};



/*
query SuggestedGenes_Test_Query {
  highlights {
    suggested_genes: broadCollectingGenes {
      ...SuggestedGenes_suggested_genes
      id
    }
  }
}

fragment SuggestedGenes_suggested_genes on Gene {
  id
  slug
  internalID
  name
  image {
    cropped(width: 100, height: 100) {
      url
    }
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SuggestedGenes_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Highlights",
        "kind": "LinkedField",
        "name": "highlights",
        "plural": false,
        "selections": [
          {
            "alias": "suggested_genes",
            "args": null,
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "broadCollectingGenes",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SuggestedGenes_suggested_genes"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SuggestedGenes_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Highlights",
        "kind": "LinkedField",
        "name": "highlights",
        "plural": false,
        "selections": [
          {
            "alias": "suggested_genes",
            "args": null,
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "broadCollectingGenes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
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
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SuggestedGenes_Test_Query",
    "operationKind": "query",
    "text": "query SuggestedGenes_Test_Query {\n  highlights {\n    suggested_genes: broadCollectingGenes {\n      ...SuggestedGenes_suggested_genes\n      id\n    }\n  }\n}\n\nfragment SuggestedGenes_suggested_genes on Gene {\n  id\n  slug\n  internalID\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n}\n"
  }
};
(node as any).hash = '9051e166c3f5299629e580177ad95827';
export default node;
