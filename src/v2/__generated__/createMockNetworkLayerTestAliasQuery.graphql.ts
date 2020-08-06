/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestAliasQueryVariables = {};
export type createMockNetworkLayerTestAliasQueryResponse = {
    readonly artist: {
        readonly forSaleArtworks: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
        } | null;
        readonly notForSaleArtworks: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type createMockNetworkLayerTestAliasQuery = {
    readonly response: createMockNetworkLayerTestAliasQueryResponse;
    readonly variables: createMockNetworkLayerTestAliasQueryVariables;
};



/*
query createMockNetworkLayerTestAliasQuery {
  artist(id: "banksy") {
    forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {
      edges {
        node {
          id
        }
      }
    }
    notForSaleArtworks: artworksConnection(filter: IS_NOT_FOR_SALE) {
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
v2 = [
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
],
v3 = {
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
  "selections": (v2/*: any*/)
},
v4 = {
  "kind": "LinkedField",
  "alias": "notForSaleArtworks",
  "name": "artworksConnection",
  "storageKey": "artworksConnection(filter:\"IS_NOT_FOR_SALE\")",
  "args": [
    {
      "kind": "Literal",
      "name": "filter",
      "value": "IS_NOT_FOR_SALE"
    }
  ],
  "concreteType": "ArtworkConnection",
  "plural": false,
  "selections": (v2/*: any*/)
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerTestAliasQuery",
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
          (v3/*: any*/),
          (v4/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestAliasQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "createMockNetworkLayerTestAliasQuery",
    "id": null,
    "text": "query createMockNetworkLayerTestAliasQuery {\n  artist(id: \"banksy\") {\n    forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    notForSaleArtworks: artworksConnection(filter: IS_NOT_FOR_SALE) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'fefd7ea56bd774b256cf177b43731c07';
export default node;
