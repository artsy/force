/**
 * @generated SignedSource<<237c006873add066995228d378104e42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorsGroup_exhibitorsGroup$data = {
  readonly exhibitors: ReadonlyArray<{
    readonly partner: {
      readonly internalID: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorCard_exhibitor">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "FairExhibitorsGroup_exhibitorsGroup";
};
export type FairExhibitorsGroup_exhibitorsGroup$key = {
  readonly " $data"?: FairExhibitorsGroup_exhibitorsGroup$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_exhibitorsGroup">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorsGroup_exhibitorsGroup",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FairExhibitor",
      "kind": "LinkedField",
      "name": "exhibitors",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairExhibitorCard_exhibitor"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Partner",
          "kind": "LinkedField",
          "name": "partner",
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
  "type": "FairExhibitorsGroup",
  "abstractKey": null
};

(node as any).hash = "07e7e704b42a9c050453491d459d1d14";

export default node;
