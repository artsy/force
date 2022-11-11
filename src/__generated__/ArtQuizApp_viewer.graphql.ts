/**
 * @generated SignedSource<<773f58be8d9c57f61c054b1a495ef14b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizApp_viewer$data = {
  readonly quizConnection: {
    readonly completedAt: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ArtQuizMain_quiz">;
  };
  readonly " $fragmentType": "ArtQuizApp_viewer";
};
export type ArtQuizApp_viewer$key = {
  readonly " $data"?: ArtQuizApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizApp_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Quiz",
      "kind": "LinkedField",
      "name": "quizConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "completedAt",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtQuizMain_quiz"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "b16ea84d6be38aff65a9f1ddc61abec3";

export default node;
