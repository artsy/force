/**
 * @generated SignedSource<<5ef8e9a524d7eaa268c1be0ecd6c7b1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConditionRoute_submission$data = {
  readonly myCollectionArtwork: {
    readonly artworkId: string;
    readonly condition: {
      readonly value: string | null | undefined;
    } | null | undefined;
    readonly conditionDescription: {
      readonly details: string | null | undefined;
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
              "name": "value",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkInfoRow",
          "kind": "LinkedField",
          "name": "conditionDescription",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "details",
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

(node as any).hash = "adc0ebd4bb4d87d7b38733b7563d770f";

export default node;
