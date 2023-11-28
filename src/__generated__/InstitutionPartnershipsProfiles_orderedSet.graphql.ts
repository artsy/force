/**
 * @generated SignedSource<<b4341d8962f0a63190fb9a38f3659b25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstitutionPartnershipsProfiles_orderedSet$data = {
  readonly items: ReadonlyArray<{
    readonly internalID?: string;
    readonly owner?: {
      readonly " $fragmentSpreads": FragmentRefs<"CellPartner_partner">;
    };
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "InstitutionPartnershipsProfiles_orderedSet";
};
export type InstitutionPartnershipsProfiles_orderedSet$key = {
  readonly " $data"?: InstitutionPartnershipsProfiles_orderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"InstitutionPartnershipsProfiles_orderedSet">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InstitutionPartnershipsProfiles_orderedSet",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
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
              "concreteType": null,
              "kind": "LinkedField",
              "name": "owner",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "CellPartner_partner"
                    }
                  ],
                  "type": "Partner",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "Profile",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};

(node as any).hash = "cd6ce7da61d0f2c991b27a91c33d4e6b";

export default node;
