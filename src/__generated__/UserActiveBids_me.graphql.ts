/**
 * @generated SignedSource<<383d971433e81b6b3d8b8a316cecfde1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserActiveBids_me$data = {
  readonly activeLotStandings: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"SettingsAuctionsLotStanding_lotStanding">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "UserActiveBids_me";
};
export type UserActiveBids_me$key = {
  readonly " $data"?: UserActiveBids_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserActiveBids_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserActiveBids_me",
  "selections": [
    {
      "alias": "activeLotStandings",
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        }
      ],
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "lotStandings",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SettingsAuctionsLotStanding_lotStanding"
        }
      ],
      "storageKey": "lotStandings(live:true)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "f185c4dd69796cdef210dba0cd7993e9";

export default node;
