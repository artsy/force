/**
 * @generated SignedSource<<8f409a79b29cc45eb95d18b31c098623>>
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
    readonly artworkId: string;
    readonly condition: {
      readonly description: string | null | undefined;
      readonly value: string | null | undefined;
    } | null | undefined;
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
          "alias": "artworkId",
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

(node as any).hash = "eb17ba91253a548f677709a33f6e3649";

export default node;
