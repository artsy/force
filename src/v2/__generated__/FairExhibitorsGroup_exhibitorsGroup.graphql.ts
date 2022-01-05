/* tslint:disable */
/* eslint-disable */

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
    readonly " $data"?: FairExhibitorsGroup_exhibitorsGroup$data;
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
  "type": "FairExhibitorsGroup"
};
(node as any).hash = '364e3f278ff335323a71c21126d351da';
export default node;
