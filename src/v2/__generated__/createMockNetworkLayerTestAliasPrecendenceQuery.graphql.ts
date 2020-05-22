/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestAliasPrecendenceQueryVariables = {};
export type createMockNetworkLayerTestAliasPrecendenceQueryResponse = {
    readonly artist: {
        readonly forSaleArtworks: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type createMockNetworkLayerTestAliasPrecendenceQuery = {
    readonly response: createMockNetworkLayerTestAliasPrecendenceQueryResponse;
    readonly variables: createMockNetworkLayerTestAliasPrecendenceQueryVariables;
};



/*
query createMockNetworkLayerTestAliasPrecendenceQuery {
  artist(id: "banksy") {
    forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {
      edges {
        node {
          id
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "banksy"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "LinkedField",
  "alias": "forSaleArtworks",
  "name": "artworksConnection",
  "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\")",
  "args": [
    {
      "kind": "Literal",
      "name": "filter",
      "value": "IS_FOR_SALE"
    }
  ],
  "concreteType": "ArtworkConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Artwork",
          "plural": false,
          "selections": [
            (v1/*: any*/)
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
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"banksy\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"banksy\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "id": null,
    "text": "query createMockNetworkLayerTestAliasPrecendenceQuery {\n  artist(id: \"banksy\") {\n    forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '92c8ccb40dd497258b009d3930532e77';
export default node;
