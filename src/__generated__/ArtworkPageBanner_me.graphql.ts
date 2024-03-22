/**
 * @generated SignedSource<<09db634261f6fffd1dd10400018523e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkPageBanner_me$data = {
  readonly partnerOffersConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkPageBanner_me";
};
export type ArtworkPageBanner_me$key = {
  readonly " $data"?: ArtworkPageBanner_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkPageBanner_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "artworkID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkPageBanner_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "artworkID",
          "variableName": "artworkID"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "PartnerOfferToCollectorConnection",
      "kind": "LinkedField",
      "name": "partnerOffersConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PartnerOfferToCollectorEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerOfferToCollector",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
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
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "188049007fb00a68c403d9610c6853ea";

export default node;
