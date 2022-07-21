/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": "forSaleArtworks",
  "args": [
    {
      "kind": "Literal",
      "name": "filter",
      "value": "IS_FOR_SALE"
    }
  ],
  "concreteType": "ArtworkConnection",
  "kind": "LinkedField",
  "name": "artworksConnection",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": "artist(id:\"banksy\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"banksy\")"
      }
    ]
  },
  "params": {
    "cacheID": "a8be7eed0e853c7b0b536eeede369966",
    "id": null,
    "metadata": {},
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "operationKind": "query",
    "text": "query createMockNetworkLayerTestAliasPrecendenceQuery {\n  artist(id: \"banksy\") {\n    forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '92c8ccb40dd497258b009d3930532e77';
export default node;
