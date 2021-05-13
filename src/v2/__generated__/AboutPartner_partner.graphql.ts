/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AboutPartner_partner = {
    readonly profile: {
        readonly fullBio: string | null;
    } | null;
    readonly website: string | null;
    readonly vatNumber: string | null;
    readonly " $refType": "AboutPartner_partner";
};
export type AboutPartner_partner$data = AboutPartner_partner;
export type AboutPartner_partner$key = {
    readonly " $data"?: AboutPartner_partner$data;
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
    }
  ],
  "type": "Partner"
};
(node as any).hash = 'cc2bf3eccf000ed20487bf3b7ce8bc9d';
export default node;
