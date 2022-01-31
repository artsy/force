/**
 * @generated SignedSource<<56bec84b6351fc2e3a0bfd0ff8d3d5ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserBidHistory_me$data = {
  readonly inactiveLotStandings: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"SettingsAuctionsLotStanding_lotStanding">;
  } | null> | null;
  readonly " $fragmentType": "UserBidHistory_me";
};
export type UserBidHistory_me$key = {
  readonly " $data"?: UserBidHistory_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserBidHistory_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserBidHistory_me",
  "selections": [
    {
      "alias": "inactiveLotStandings",
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": false
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
      "storageKey": "lotStandings(live:false)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "e30334054ea3018f848981a65e226f56";

export default node;
