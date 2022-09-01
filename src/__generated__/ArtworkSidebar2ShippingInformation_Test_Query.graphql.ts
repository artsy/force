/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2ShippingInformation_Test_QueryVariables = {};
export type ArtworkSidebar2ShippingInformation_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2ShippingInformation_artwork">;
    } | null;
};
export type ArtworkSidebar2ShippingInformation_Test_Query = {
    readonly response: ArtworkSidebar2ShippingInformation_Test_QueryResponse;
    readonly variables: ArtworkSidebar2ShippingInformation_Test_QueryVariables;
};



/*
query ArtworkSidebar2ShippingInformation_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebar2ShippingInformation_artwork
    id
  }
}

fragment ArtworkSidebar2ShippingInformation_artwork on Artwork {
  shippingOrigin
  shippingInfo
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebar2ShippingInformation_Test_Query",
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
            "name": "ArtworkSidebar2ShippingInformation_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebar2ShippingInformation_Test_Query",
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
            "name": "shippingOrigin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingInfo",
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
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "d58c75e9f7e3d1c764fd91099ba33994",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.shippingInfo": (v1/*: any*/),
        "artwork.shippingOrigin": (v1/*: any*/)
      }
    },
    "name": "ArtworkSidebar2ShippingInformation_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar2ShippingInformation_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar2ShippingInformation_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebar2ShippingInformation_artwork on Artwork {\n  shippingOrigin\n  shippingInfo\n}\n"
  }
};
})();
(node as any).hash = '781a30784c8122360b9364bdd1426e1d';
export default node;
