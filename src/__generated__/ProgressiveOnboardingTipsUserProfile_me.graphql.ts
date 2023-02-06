/**
 * @generated SignedSource<<fde2545832166e913449f55ca8984adc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingTipsUserProfile_me$data = {
  readonly followsAndSaves: {
    readonly artworksConnection: {
      readonly totalCount: number | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ProgressiveOnboardingTipsUserProfile_me";
};
export type ProgressiveOnboardingTipsUserProfile_me$key = {
  readonly " $data"?: ProgressiveOnboardingTipsUserProfile_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingTipsUserProfile_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProgressiveOnboardingTipsUserProfile_me",
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

(node as any).hash = "3b39e4cf2718829fcb68bd73f6676f76";

export default node;
