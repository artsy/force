/**
 * @generated SignedSource<<e402ae954e3958d1c55265c785fe423e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBarSale_sale$data = {
  readonly coverImage: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly isAuction: boolean | null | undefined;
  readonly isBenefit: boolean | null | undefined;
  readonly isGalleryAuction: boolean | null | undefined;
  readonly name: string | null | undefined;
  readonly partner: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"RegistrationAuctionTimer_sale">;
  readonly " $fragmentType": "ArtworkTopContextBarSale_sale";
};
export type ArtworkTopContextBarSale_sale$key = {
  readonly " $data"?: ArtworkTopContextBarSale_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarSale_sale">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkTopContextBarSale_sale",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RegistrationAuctionTimer_sale"
    },
    (v0/*: any*/),
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
})();

(node as any).hash = "d8bf11075c83dafddccc2e20083866ed";

export default node;
