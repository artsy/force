/**
 * @generated SignedSource<<e9a42c497abc82de34c36b81e723fd77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileFields_me$data = {
  readonly bio: string | null;
  readonly canRequestEmailConfirmation: boolean;
  readonly email: string | null;
  readonly emailConfirmed: boolean;
  readonly icon: {
    readonly url: string | null;
  } | null;
  readonly identityVerified: boolean | null;
  readonly location: {
    readonly city: string | null;
    readonly country: string | null;
    readonly display: string | null;
    readonly state: string | null;
  } | null;
  readonly name: string | null;
  readonly otherRelevantPositions: string | null;
  readonly profession: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderAvatar_me">;
  readonly " $fragmentType": "SettingsEditProfileFields_me";
};
export type SettingsEditProfileFields_me$key = {
  readonly " $data"?: SettingsEditProfileFields_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileFields_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileFields_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileHeaderAvatar_me"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
      "name": "otherRelevantPositions",
      "storageKey": null
    },
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "icon",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "thumbnail"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"thumbnail\")"
        }
      ],
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
          "name": "display",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        },
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailConfirmed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "identityVerified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canRequestEmailConfirmation",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "4277c605fb20269124cb724bc1619918";

export default node;
