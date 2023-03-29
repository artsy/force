/**
 * @generated SignedSource<<2c35b148f2203e1abfdc49e1fa5b5587>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationCollectorProfileHeader_user$data = {
  readonly collectorProfile: {
    readonly artsyUserSince: string | null;
    readonly name: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileVerifications_collectorProfileType">;
  } | null;
  readonly initials: string | null;
  readonly " $fragmentType": "ConversationCollectorProfileHeader_user";
};
export type ConversationCollectorProfileHeader_user$key = {
  readonly " $data"?: ConversationCollectorProfileHeader_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileHeader_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationCollectorProfileHeader_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "initials",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorProfileType",
      "kind": "LinkedField",
      "name": "collectorProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "YYYY"
            }
          ],
          "kind": "ScalarField",
          "name": "artsyUserSince",
          "storageKey": "artsyUserSince(format:\"YYYY\")"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ConversationCollectorProfileVerifications_collectorProfileType"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "567af9c69ef5a96227fcfc5fb1e3fbc7";

export default node;
