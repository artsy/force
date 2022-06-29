/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorCard_exhibitor = {
    readonly profileID: string | null;
    readonly partner: {
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"EntityHeaderPartner_partner">;
    } | null;
    readonly " $refType": "FairExhibitorCard_exhibitor";
};
export type FairExhibitorCard_exhibitor$data = FairExhibitorCard_exhibitor;
export type FairExhibitorCard_exhibitor$key = {
    readonly " $data"?: FairExhibitorCard_exhibitor$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_exhibitor">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorCard_exhibitor",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderPartner_partner"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairExhibitor",
  "abstractKey": null
};
(node as any).hash = '117da6dd1e9b1be9e5b6ba89e8baf624';
export default node;
