/**
 * @generated SignedSource<<13f03cd393f010f78a2ec32a1cd25a80>>
 * @relayHash 824ef82c5dedd0c7866708b18326189c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 824ef82c5dedd0c7866708b18326189c

import { ConcreteRequest, Query } from 'relay-runtime';
export type createMockNetworkLayerTestAliasQuery$variables = Record<PropertyKey, never>;
export type createMockNetworkLayerTestAliasQuery$data = {
  readonly artist: {
    readonly forSaleArtworks: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly notForSaleArtworks: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type createMockNetworkLayerTestAliasQuery = {
  response: createMockNetworkLayerTestAliasQuery$data;
  variables: createMockNetworkLayerTestAliasQuery$variables;
};

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
v2 = [
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
v3 = {
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
  "selections": (v2/*: any*/),
  "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\")"
},
v4 = {
  "alias": "notForSaleArtworks",
  "args": [
    {
      "kind": "Literal",
      "name": "filter",
      "value": "IS_NOT_FOR_SALE"
    }
  ],
  "concreteType": "ArtworkConnection",
  "kind": "LinkedField",
  "name": "artworksConnection",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": "artworksConnection(filter:\"IS_NOT_FOR_SALE\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "createMockNetworkLayerTestAliasQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
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
    "name": "createMockNetworkLayerTestAliasQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"banksy\")"
      }
    ]
  },
  "params": {
    "id": "824ef82c5dedd0c7866708b18326189c",
    "metadata": {},
    "name": "createMockNetworkLayerTestAliasQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fefd7ea56bd774b256cf177b43731c07";

export default node;
