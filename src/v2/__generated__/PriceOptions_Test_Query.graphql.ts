/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PriceOptions_Test_QueryVariables = {};
export type PriceOptions_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"PriceOptions_artwork">;
    } | null;
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"PriceOptions_order">;
    } | null;
};
export type PriceOptions_Test_Query = {
    readonly response: PriceOptions_Test_QueryResponse;
    readonly variables: PriceOptions_Test_QueryVariables;
};



/*
query PriceOptions_Test_Query {
  artwork(id: "artwork-id") {
    ...PriceOptions_artwork
    id
  }
  order: commerceOrder(id: "order-id") {
    __typename
    ...PriceOptions_order
    id
  }
}

fragment PriceOptions_artwork on Artwork {
  priceCurrency
  isPriceRange
}

fragment PriceOptions_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceOptions_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceOptions_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      },
      {
        "alias": "order",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceOptions_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"order-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PriceOptions_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceRange",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      },
      {
        "alias": "order",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"order-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "69de5745c01500b591d25bfc88ce759a",
    "id": null,
    "metadata": {},
    "name": "PriceOptions_Test_Query",
    "operationKind": "query",
    "text": "query PriceOptions_Test_Query {\n  artwork(id: \"artwork-id\") {\n    ...PriceOptions_artwork\n    id\n  }\n  order: commerceOrder(id: \"order-id\") {\n    __typename\n    ...PriceOptions_order\n    id\n  }\n}\n\nfragment PriceOptions_artwork on Artwork {\n  priceCurrency\n  isPriceRange\n}\n\nfragment PriceOptions_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n}\n"
  }
};
})();
(node as any).hash = '70868563e3cda3defa5a5124665c755a';
export default node;
