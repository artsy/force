/**
<<<<<<< HEAD
<<<<<<< HEAD
 * @generated SignedSource<<7d6bf1d1ff23991f50e5301ffcdfc530>>
=======
 * @generated SignedSource<<0f59d923e037d431771e1ff412685606>>
>>>>>>> 3ca3a1726f (feat: don't render primary label when there is a partner offer)
=======
 * @generated SignedSource<<dabfed9907a9a9bdb6923ad10c4887cf>>
>>>>>>> 601b6174a9 (chore: use context to track signals)
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
  readonly collectorSignals: {
    readonly partnerOffer: {
      readonly endAt: string | null | undefined;
      readonly priceWithDiscount: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly primaryLabel: LabelSignalEnum | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly " $fragmentType": "PrimaryLabelLine_artwork";
};
export type PrimaryLabelLine_artwork$key = {
  readonly " $data"?: PrimaryLabelLine_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrimaryLabelLine_artwork">;
};

const node: ReaderFragment = {
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "0371de683dd83b88cbf9c4f6d5bd8faf";

export default node;
