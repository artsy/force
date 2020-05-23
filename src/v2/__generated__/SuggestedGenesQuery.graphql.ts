/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SuggestedGenesQueryVariables = {};
export type SuggestedGenesQueryResponse = {
    readonly highlights: {
        readonly suggested_genes: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"SuggestedGenes_suggested_genes">;
        } | null> | null;
    } | null;
};
export type SuggestedGenesQuery = {
    readonly response: SuggestedGenesQueryResponse;
    readonly variables: SuggestedGenesQueryVariables;
};



/*
query SuggestedGenesQuery {
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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SuggestedGenesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "highlights",
        "storageKey": null,
        "args": null,
        "concreteType": "Highlights",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "suggested_genes",
            "name": "broadCollectingGenes",
            "storageKey": null,
            "args": null,
            "concreteType": "Gene",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "SuggestedGenes_suggested_genes",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SuggestedGenesQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "highlights",
        "storageKey": null,
        "args": null,
        "concreteType": "Highlights",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "suggested_genes",
            "name": "broadCollectingGenes",
            "storageKey": null,
            "args": null,
            "concreteType": "Gene",
            "plural": true,
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
  },
  "params": {
    "operationKind": "query",
    "name": "SuggestedGenesQuery",
    "id": null,
    "text": "query SuggestedGenesQuery {\n  highlights {\n    suggested_genes: broadCollectingGenes {\n      ...SuggestedGenes_suggested_genes\n      id\n    }\n  }\n}\n\nfragment SuggestedGenes_suggested_genes on Gene {\n  id\n  slug\n  internalID\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '91f31587213209d9aee297d52ee8babb';
export default node;
