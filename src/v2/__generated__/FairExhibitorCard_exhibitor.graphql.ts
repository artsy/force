/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorCard_exhibitor = {
    readonly profileID: string | null;
    readonly partner: {
        readonly name: string | null;
        readonly internalID: string;
        readonly slug: string;
        readonly cities: ReadonlyArray<string | null> | null;
        readonly profile: {
            readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
        } | null;
    } | null;
    readonly " $refType": "FairExhibitorCard_exhibitor";
};
export type FairExhibitorCard_exhibitor$data = FairExhibitorCard_exhibitor;
export type FairExhibitorCard_exhibitor$key = {
    readonly " $data"?: FairExhibitorCard_exhibitor$data;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_exhibitor">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorCard_exhibitor",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileID",
      "storageKey": null
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
          "name": "name",
          "storageKey": null
        },
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
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cities",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Profile",
          "kind": "LinkedField",
          "name": "profile",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FollowProfileButton_profile"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairExhibitor",
  "abstractKey": null
};
(node as any).hash = '05a4102e1727dc4949254af298a9e7ce';
export default node;
