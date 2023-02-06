/**
 * @generated SignedSource<<c6ac854e908f160b5f1bfa9bc722203a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingTipsSaveArtwork_me$data = {
  readonly followsAndSaves: {
    readonly artworksConnection: {
      readonly totalCount: number | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ProgressiveOnboardingTipsSaveArtwork_me";
};
export type ProgressiveOnboardingTipsSaveArtwork_me$key = {
  readonly " $data"?: ProgressiveOnboardingTipsSaveArtwork_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingTipsSaveArtwork_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProgressiveOnboardingTipsSaveArtwork_me",
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
          "concreteType": "SavedArtworksConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
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
          "storageKey": "artworksConnection(first:1)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "1677401c5c6ee778067124289abebbe9";

export default node;
