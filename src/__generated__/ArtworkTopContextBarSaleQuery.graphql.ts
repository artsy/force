/**
 * @generated SignedSource<<e241f5c3536c8ad7408602232183e29f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBarSaleQuery$variables = {
  id: string;
};
export type ArtworkTopContextBarSaleQuery$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarSale_sale">;
  } | null | undefined;
};
export type ArtworkTopContextBarSaleQuery = {
  response: ArtworkTopContextBarSaleQuery$data;
  variables: ArtworkTopContextBarSaleQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkTopContextBarSaleQuery",
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
            "name": "ArtworkTopContextBarSale_sale"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkTopContextBarSaleQuery",
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
            "name": "registrationEndsAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isRegistrationClosed",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAuction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isBenefit",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isGalleryAuction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "coverImage",
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "abc0192643ea0e99f39ca2c229c2ae0e",
    "id": null,
    "metadata": {},
    "name": "ArtworkTopContextBarSaleQuery",
    "operationKind": "query",
    "text": "query ArtworkTopContextBarSaleQuery(\n  $id: String!\n) {\n  sale(id: $id) {\n    ...ArtworkTopContextBarSale_sale\n    id\n  }\n}\n\nfragment ArtworkTopContextBarSale_sale on Sale {\n  ...RegistrationAuctionTimer_sale\n  name\n  href\n  isAuction\n  isBenefit\n  isGalleryAuction\n  coverImage {\n    url\n  }\n  partner {\n    name\n    id\n  }\n}\n\nfragment RegistrationAuctionTimer_sale on Sale {\n  registrationEndsAt\n  isRegistrationClosed\n}\n"
  }
};
})();

(node as any).hash = "dba519ba4770ffac900c1f6a93ba29aa";

export default node;
