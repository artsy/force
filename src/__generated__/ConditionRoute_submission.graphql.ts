/**
 * @generated SignedSource<<dfd654e5498114691c0d13e904989a5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConditionRoute_submission$data = {
  readonly myCollectionArtwork: {
    readonly condition: {
      readonly description: string | null | undefined;
      readonly displayText: string | null | undefined;
      readonly value: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
  } | null | undefined;
  readonly " $fragmentType": "ConditionRoute_submission";
};
export type ConditionRoute_submission$key = {
  readonly " $data"?: ConditionRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConditionRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConditionRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "myCollectionArtwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkCondition",
          "kind": "LinkedField",
          "name": "condition",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "description",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "displayText",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "value",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "0ece9dffe4a846b2dd413fb7ba7a579d";

export default node;
