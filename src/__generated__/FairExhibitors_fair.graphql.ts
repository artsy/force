/**
 * @generated SignedSource<<40d47abfe861e5186daa445e7f3e0cbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_fair$data = {
  readonly exhibitorsGroupedByName: ReadonlyArray<{
    readonly exhibitors: ReadonlyArray<{
      readonly partnerID: string | null;
    } | null> | null;
    readonly letter: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_exhibitorsGroup">;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_fair">;
  readonly " $fragmentType": "FairExhibitors_fair";
};
export type FairExhibitors_fair$key = {
  readonly " $data"?: FairExhibitors_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitors_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitors_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairExhibitorsGroup_fair"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FairExhibitorsGroup",
      "kind": "LinkedField",
      "name": "exhibitorsGroupedByName",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairExhibitorsGroup_exhibitorsGroup"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "letter",
          "storageKey": null
        },
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
              "kind": "ScalarField",
              "name": "partnerID",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "235c1381aa13a8c7187aae90fca97fbe";

export default node;
