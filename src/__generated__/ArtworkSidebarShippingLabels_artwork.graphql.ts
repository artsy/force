/**
 * @generated SignedSource<<69b8e30a261e079f9c126cc9ff27d440>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarShippingLabels_artwork$data = {
  readonly artsyShippingInternational: boolean | null | undefined;
  readonly domesticShippingFee: {
    readonly display: string | null | undefined;
    readonly major: number;
    readonly minor: any;
  } | null | undefined;
  readonly euShippingOrigin: boolean | null | undefined;
  readonly internationalShippingFee: {
    readonly display: string | null | undefined;
    readonly major: number;
    readonly minor: any;
  } | null | undefined;
  readonly isAcquireable: boolean | null | undefined;
  readonly isOfferable: boolean | null | undefined;
  readonly onlyShipsDomestically: boolean | null | undefined;
  readonly processWithArtsyShippingDomestic: boolean | null | undefined;
  readonly shippingCountry: string | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarShippingLabels_artwork";
};
export type ArtworkSidebarShippingLabels_artwork$key = {
  readonly " $data"?: ArtworkSidebarShippingLabels_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarShippingLabels_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minor",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarShippingLabels_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
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
      "kind": "ScalarField",
      "name": "onlyShipsDomestically",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "processWithArtsyShippingDomestic",
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
      "name": "euShippingOrigin",
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
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "internationalShippingFee",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "d28c74cfe0a8f1333c06a7518ec2ac14";

export default node;
