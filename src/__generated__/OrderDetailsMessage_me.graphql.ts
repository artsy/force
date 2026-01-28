/**
 * @generated SignedSource<<355b54e398e498141a2325485e8b3a98>>
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
    readonly isEmailConfirmed: boolean | null | undefined;
    readonly isIdentityVerified: boolean | null | undefined;
    readonly location: {
      readonly country: string | null | undefined;
    } | null | undefined;
    readonly otherRelevantPositions: string | null | undefined;
    readonly profession: string | null | undefined;
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
          "name": "isEmailConfirmed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MyLocation",
          "kind": "LinkedField",
          "name": "location",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "country",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "profession",
          "storageKey": null
        },
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
          "name": "otherRelevantPositions",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "dfbdf6f9fe05fd88bce87c66f2f7aab6";

export default node;
