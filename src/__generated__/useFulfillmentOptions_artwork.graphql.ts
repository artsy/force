/**
 * @generated SignedSource<<38123c65d8a57981db36b217dcb4ab45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useFulfillmentOptions_artwork$data = {
  readonly artsyShippingDomestic: boolean | null | undefined;
  readonly artsyShippingInternational: boolean | null | undefined;
  readonly domesticShippingFee: {
    readonly minor: any;
  } | null | undefined;
  readonly euShippingOrigin: boolean | null | undefined;
  readonly internationalShippingFee: {
    readonly minor: any;
  } | null | undefined;
  readonly isPurchasable: boolean | null | undefined;
  readonly onlyShipsDomestically: boolean | null | undefined;
  readonly pickupAvailable: boolean | null | undefined;
  readonly shippingCountry: string | null | undefined;
  readonly " $fragmentType": "useFulfillmentOptions_artwork";
};
export type useFulfillmentOptions_artwork$key = {
  readonly " $data"?: useFulfillmentOptions_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"useFulfillmentOptions_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minor",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useFulfillmentOptions_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPurchasable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingCountry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "domesticShippingFee",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "euShippingOrigin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "internationalShippingFee",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artsyShippingDomestic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artsyShippingInternational",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pickupAvailable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "onlyShipsDomestically",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "dc73bdc5172a52b0deca786b6ce9f9ac";

export default node;
