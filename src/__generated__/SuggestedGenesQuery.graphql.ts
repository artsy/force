/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SuggestedGenesQueryVariables = {
};
export type SuggestedGenesQueryResponse = {
    readonly suggested_genes: ReadonlyArray<({
    }) | null> | null;
};



/*
query SuggestedGenesQuery {
  suggested_genes {
    ...SuggestedGenesContent_suggested_genes
    __id
  }
}

fragment SuggestedGenesContent_suggested_genes on Gene {
  id
  _id
  name
  image {
    cropped(width: 100, height: 100) {
      url
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "SuggestedGenesQuery",
  "id": null,
  "text": "query SuggestedGenesQuery {\n  suggested_genes {\n    ...SuggestedGenesContent_suggested_genes\n    __id\n  }\n}\n\nfragment SuggestedGenesContent_suggested_genes on Gene {\n  id\n  _id\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n  __id\n}\n",
  "metadata": {},
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
        "name": "suggested_genes",
        "storageKey": null,
        "args": null,
        "concreteType": "Gene",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SuggestedGenesContent_suggested_genes",
            "args": null
          },
          v0
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
        "name": "suggested_genes",
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
            "name": "_id",
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
          },
          v0
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'a9738ea08755f945124085b68763957f';
export default node;
