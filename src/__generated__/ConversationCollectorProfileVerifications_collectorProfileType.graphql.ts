/**
 * @generated SignedSource<<5346ebab5ff3d49c9d11ef171ce70f31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationCollectorProfileVerifications_collectorProfileType$data = {
  readonly isEmailConfirmed: boolean | null;
  readonly isIdentityVerified: boolean | null;
  readonly " $fragmentType": "ConversationCollectorProfileVerifications_collectorProfileType";
};
export type ConversationCollectorProfileVerifications_collectorProfileType$key = {
  readonly " $data"?: ConversationCollectorProfileVerifications_collectorProfileType$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileVerifications_collectorProfileType">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationCollectorProfileVerifications_collectorProfileType",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isIdentityVerified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEmailConfirmed",
      "storageKey": null
    }
  ],
  "type": "CollectorProfileType",
  "abstractKey": null
};

(node as any).hash = "bd8b1f8007837d061f534226c480c680";

export default node;
