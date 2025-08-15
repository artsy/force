/**
 * @generated SignedSource<<f0f945e468899fe1b7f2b3e79e4fb7d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsMessage_me$data = {
  readonly collectorProfile: {
    readonly bio: string | null | undefined;
    readonly firstNameLastInitial: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "OrderDetailsMessage_me";
};
export type OrderDetailsMessage_me$key = {
  readonly " $data"?: OrderDetailsMessage_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsMessage_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderDetailsMessage_me",
  "selections": [
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
          "name": "bio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstNameLastInitial",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "1e041edebc4faecdb0373c596c44a730";

export default node;
