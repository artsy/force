/**
 * @generated SignedSource<<f41ab52eb16149845b045a55592d905d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useConversationPurchaseButtonData_partnerOffer$data = {
  readonly endAt: string | null | undefined;
  readonly internalID: string;
  readonly priceWithDiscount: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useConversationPurchaseButtonData_partnerOffer";
};
export type useConversationPurchaseButtonData_partnerOffer$key = {
  readonly " $data"?: useConversationPurchaseButtonData_partnerOffer$data;
  readonly " $fragmentSpreads": FragmentRefs<"useConversationPurchaseButtonData_partnerOffer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useConversationPurchaseButtonData_partnerOffer",
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
  "type": "PartnerOfferToCollector",
  "abstractKey": null
};

(node as any).hash = "2437d7aa1ac5d56aaddb2c982df859c4";

export default node;
