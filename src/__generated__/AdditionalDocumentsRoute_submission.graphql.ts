/**
 * @generated SignedSource<<e22212cc445d4b337174597500cfd578>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdditionalDocumentsRoute_submission$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "AdditionalDocumentsRoute_submission";
};
export type AdditionalDocumentsRoute_submission$key = {
  readonly " $data"?: AdditionalDocumentsRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdditionalDocumentsRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdditionalDocumentsRoute_submission",
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

(node as any).hash = "91014ad495755b814e5d0cdc9bdd759d";

export default node;
