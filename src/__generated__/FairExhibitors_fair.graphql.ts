/**
 * @generated SignedSource<<522e30f31c49fccd1769191cdd8d8e84>>
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
      readonly partnerID: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly letter: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_exhibitorsGroup">;
  } | null | undefined> | null | undefined;
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
