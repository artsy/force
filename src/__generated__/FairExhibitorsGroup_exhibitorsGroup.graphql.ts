/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorsGroup_exhibitorsGroup = {
    readonly exhibitors: ReadonlyArray<{
        readonly partner: {
            readonly internalID: string;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_exhibitor">;
    } | null> | null;
    readonly " $refType": "FairExhibitorsGroup_exhibitorsGroup";
};
export type FairExhibitorsGroup_exhibitorsGroup$data = FairExhibitorsGroup_exhibitorsGroup;
export type FairExhibitorsGroup_exhibitorsGroup$key = {
    readonly " $data"?: FairExhibitorsGroup_exhibitorsGroup$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorsGroup_exhibitorsGroup">;
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairExhibitorCard_exhibitor"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairExhibitorsGroup",
  "abstractKey": null
};
(node as any).hash = '07e7e704b42a9c050453491d459d1d14';
export default node;
