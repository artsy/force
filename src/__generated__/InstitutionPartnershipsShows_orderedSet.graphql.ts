/**
 * @generated SignedSource<<eb32a9e1dc0444b206ca8cf4dd71f4fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstitutionPartnershipsShows_orderedSet$data = {
  readonly items: ReadonlyArray<{
    readonly internalID?: string;
    readonly " $fragmentSpreads": FragmentRefs<"CellShow_show">;
  } | null> | null;
  readonly " $fragmentType": "InstitutionPartnershipsShows_orderedSet";
};
export type InstitutionPartnershipsShows_orderedSet$key = {
  readonly " $data"?: InstitutionPartnershipsShows_orderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"InstitutionPartnershipsShows_orderedSet">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InstitutionPartnershipsShows_orderedSet",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "CellShow_show"
            }
          ],
          "type": "Show",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};

(node as any).hash = "9abad1fb8178f5116a85377d4da39f91";

export default node;
