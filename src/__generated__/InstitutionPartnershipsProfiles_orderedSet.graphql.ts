/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InstitutionPartnershipsProfiles_orderedSet = {
    readonly items: ReadonlyArray<{
        readonly internalID?: string | undefined;
        readonly owner?: {
            readonly " $fragmentRefs": FragmentRefs<"CellPartner_partner">;
        } | undefined;
    } | null> | null;
    readonly " $refType": "InstitutionPartnershipsProfiles_orderedSet";
};
export type InstitutionPartnershipsProfiles_orderedSet$data = InstitutionPartnershipsProfiles_orderedSet;
export type InstitutionPartnershipsProfiles_orderedSet$key = {
    readonly " $data"?: InstitutionPartnershipsProfiles_orderedSet$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"InstitutionPartnershipsProfiles_orderedSet">;
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
(node as any).hash = 'cd6ce7da61d0f2c991b27a91c33d4e6b';
export default node;
