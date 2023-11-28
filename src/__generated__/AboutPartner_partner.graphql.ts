/**
 * @generated SignedSource<<8bcd42f2270bd60cbda46c8194934755>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AboutPartner_partner$data = {
  readonly displayFullPartnerPage: boolean | null | undefined;
  readonly internalID: string;
  readonly profile: {
    readonly bio: string | null | undefined;
    readonly fullBio: string | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly vatNumber: string | null | undefined;
  readonly website: string | null | undefined;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "7c27887a0038117640fd4334cd98deff";

export default node;
