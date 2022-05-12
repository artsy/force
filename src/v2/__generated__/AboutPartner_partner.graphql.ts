/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AboutPartner_partner = {
    readonly profile: {
        readonly fullBio: string | null;
        readonly bio: string | null;
    } | null;
    readonly website: string | null;
    readonly vatNumber: string | null;
    readonly displayFullPartnerPage: boolean | null;
    readonly " $refType": "AboutPartner_partner";
};
export type AboutPartner_partner$data = AboutPartner_partner;
export type AboutPartner_partner$key = {
    readonly " $data"?: AboutPartner_partner$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AboutPartner_partner">;
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
(node as any).hash = 'f4275bcda7bfe647ae27ca92d8475c3d';
export default node;
