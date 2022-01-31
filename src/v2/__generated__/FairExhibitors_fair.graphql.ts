/**
 * @generated SignedSource<<6f81d919190aecd060c94ebccc2f52fd>>
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
    readonly letter: string | null;
    readonly exhibitors: ReadonlyArray<{
      readonly partnerID: string | null;
    } | null> | null;
    readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_exhibitorsGroup">;
  } | null> | null;
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
      "alias": null,
      "args": null,
      "concreteType": "FairExhibitorsGroup",
      "kind": "LinkedField",
      "name": "exhibitorsGroupedByName",
      "plural": true,
      "selections": [
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairExhibitorsGroup_exhibitorsGroup"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "6f683e8763efaec111c2de24f1e4ed37";

export default node;
