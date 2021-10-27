/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auction2Routes_ArtworksRouteQueryVariables = {
    slug: string;
};
export type auction2Routes_ArtworksRouteQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2ArtworksRoute_sale">;
    } | null;
};
export type auction2Routes_ArtworksRouteQuery = {
    readonly response: auction2Routes_ArtworksRouteQueryResponse;
    readonly variables: auction2Routes_ArtworksRouteQueryVariables;
};



/*
query auction2Routes_ArtworksRouteQuery(
  $slug: String!
) {
  sale(id: $slug) @principalField {
    ...Auction2ArtworksRoute_sale
    id
  }
}

fragment Auction2ArtworksRoute_sale on Sale {
  slug
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "auction2Routes_ArtworksRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Auction2ArtworksRoute_sale"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "auction2Routes_ArtworksRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
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
            "name": "id",
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
    "name": "auction2Routes_ArtworksRouteQuery",
    "operationKind": "query",
    "text": "query auction2Routes_ArtworksRouteQuery(\n  $slug: String!\n) {\n  sale(id: $slug) @principalField {\n    ...Auction2ArtworksRoute_sale\n    id\n  }\n}\n\nfragment Auction2ArtworksRoute_sale on Sale {\n  slug\n}\n"
  }
};
})();
(node as any).hash = '2b48cfb8fc05cb3452836ac286b7a0a6';
export default node;
