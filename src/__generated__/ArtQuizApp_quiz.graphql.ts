/**
 * @generated SignedSource<<b4e721cfb2dfa23f4dad8f75f597d3e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizApp_quiz$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizMain_quiz">;
  readonly " $fragmentType": "ArtQuizApp_quiz";
};
export type ArtQuizApp_quiz$key = {
  readonly " $data"?: ArtQuizApp_quiz$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizApp_quiz">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizApp_quiz",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtQuizMain_quiz"
    }
  ],
  "type": "Quiz",
  "abstractKey": null
};

(node as any).hash = "1d0e5bff7d42a3261d68fa103f129a14";

export default node;
