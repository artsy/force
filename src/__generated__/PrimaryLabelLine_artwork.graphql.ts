/**
 * @generated SignedSource<<08d358b2d6ff42b8163cbceab9679561>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PrimaryLabelLine_artwork$data = {
  readonly artsyShippingDomestic: boolean | null | undefined;
  readonly artsyShippingInternational: boolean | null | undefined;
  readonly collectorSignals: {
    readonly curatorsPick: boolean | null | undefined;
    readonly increasedInterest: boolean;
    readonly partnerOffer: {
      readonly endAt: string | null | undefined;
      readonly priceWithDiscount: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly primaryLabel: LabelSignalEnum | null | undefined;
    readonly runningShow: {
      readonly city: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly domesticShippingFee: {
    readonly minor: any;
  } | null | undefined;
  readonly euShippingOrigin: boolean | null | undefined;
  readonly internalID: string;
  readonly internationalShippingFee: {
    readonly minor: any;
  } | null | undefined;
  readonly isPurchasable: boolean | null | undefined;
  readonly onlyShipsDomestically: boolean | null | undefined;
  readonly pickupAvailable: boolean | null | undefined;
  readonly shippingCountry: string | null | undefined;
  readonly " $fragmentType": "PrimaryLabelLine_artwork";
};
export type PrimaryLabelLine_artwork$key = {
  readonly " $data"?: PrimaryLabelLine_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrimaryLabelLine_artwork">;
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
  "name": "PrimaryLabelLine_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorSignals",
      "kind": "LinkedField",
      "name": "collectorSignals",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "primaryLabel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PartnerOfferToCollector",
          "kind": "LinkedField",
          "name": "partnerOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "priceWithDiscount",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "display",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "curatorsPick",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "increasedInterest",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Show",
          "kind": "LinkedField",
          "name": "runningShow",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "city",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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

(node as any).hash = "af4744e36a6887a5d5ab44b8d5abe9a6";

export default node;
