/**
 * @generated SignedSource<<1a0bd92967c77ebbe137005892550182>>
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bio",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "5dfd9b11e8fe66d124e0f700e325f07f";

export default node;
