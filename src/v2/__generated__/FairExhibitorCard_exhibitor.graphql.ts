/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorCard_exhibitor = {
    readonly profileID: string | null;
    readonly slug: string;
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
    readonly " $data"?: FairExhibitorCard_exhibitor$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_exhibitor">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
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
    (v0/*: any*/),
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
        (v0/*: any*/),
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
})();
(node as any).hash = '39005426befcba3b98c1048db30ecdb9';
export default node;
