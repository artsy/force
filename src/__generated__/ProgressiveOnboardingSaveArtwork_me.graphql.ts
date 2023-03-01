/**
 * @generated SignedSource<<03b27a7c54e88a6dc7e3277fb2808603>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingSaveArtwork_me$data = {
  readonly counts: {
    readonly savedArtworks: number;
  } | null;
  readonly " $fragmentType": "ProgressiveOnboardingSaveArtwork_me";
};
export type ProgressiveOnboardingSaveArtwork_me$key = {
  readonly " $data"?: ProgressiveOnboardingSaveArtwork_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingSaveArtwork_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProgressiveOnboardingSaveArtwork_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MeCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "savedArtworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "36595ca25ac4f19164a046e664f0e50f";

export default node;
