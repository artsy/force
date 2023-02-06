/**
 * @generated SignedSource<<1b3a5818d0a34fd69c03d0bb78be26b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingTipsFollowArtist_me$data = {
  readonly followsAndSaves: {
    readonly artistsConnection: {
      readonly totalCount: number | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ProgressiveOnboardingTipsFollowArtist_me";
};
export type ProgressiveOnboardingTipsFollowArtist_me$key = {
  readonly " $data"?: ProgressiveOnboardingTipsFollowArtist_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingTipsFollowArtist_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProgressiveOnboardingTipsFollowArtist_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FollowsAndSaves",
      "kind": "LinkedField",
      "name": "followsAndSaves",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1
            }
          ],
          "concreteType": "FollowArtistConnection",
          "kind": "LinkedField",
          "name": "artistsConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            }
          ],
          "storageKey": "artistsConnection(first:1)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "19e24b20a6f8f448b49c06fdc2f225c4";

export default node;
