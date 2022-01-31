/**
 * @generated SignedSource<<902cf3f4810b1a770ea8cc7e21d9dced>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AboutPartner_partner$data = {
  readonly profile: {
    readonly fullBio: string | null;
    readonly bio: string | null;
  } | null;
  readonly website: string | null;
  readonly vatNumber: string | null;
  readonly displayFullPartnerPage: boolean | null;
  readonly " $fragmentType": "AboutPartner_partner";
};
export type AboutPartner_partner$key = {
  readonly " $data"?: AboutPartner_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"AboutPartner_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AboutPartner_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fullBio",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "website",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vatNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayFullPartnerPage",
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "f4275bcda7bfe647ae27ca92d8475c3d";

export default node;
