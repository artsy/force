/**
 * @generated SignedSource<<48cf10f2a5e2f5e16434360d83a8ec69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrameRoute_submission$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "FrameRoute_submission";
};
export type FrameRoute_submission$key = {
  readonly " $data"?: FrameRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrameRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrameRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderArtist_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "b28f603b831d7c0a313069026b1e5aff";

export default node;
