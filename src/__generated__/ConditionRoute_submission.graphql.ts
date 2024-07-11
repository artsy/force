/**
 * @generated SignedSource<<63db1c9af10108a1aeb0b3bfc27b5b18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConditionRoute_submission$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null | undefined;
  readonly myCollectionArtwork: {
    readonly condition: {
      readonly value: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
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
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
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
          "concreteType": "ArtworkCondition",
          "kind": "LinkedField",
          "name": "condition",
          "plural": false,
          "selections": [
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

(node as any).hash = "467fe0ca7cf2daab8c554f4aa26b2180";

export default node;
