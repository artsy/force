/**
 * @generated SignedSource<<38216ee1aa6581e607da11ffab32960f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSavesAndFollowsRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSaves2Route_me">;
  readonly " $fragmentType": "CollectorProfileSavesAndFollowsRoute_me";
};
export type CollectorProfileSavesAndFollowsRoute_me$key = {
  readonly " $data"?: CollectorProfileSavesAndFollowsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSavesAndFollowsRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "shouldFetchArtworkListsData"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileSavesAndFollowsRoute_me",
  "selections": [
    {
      "condition": "shouldFetchArtworkListsData",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CollectorProfileSaves2Route_me"
        }
      ]
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "df84f18dc3f0d68178bd40473394a42a";

export default node;
