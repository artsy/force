/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerMeta_partner = {
    readonly slug: string;
    readonly type: string | null;
    readonly meta: {
        readonly image: string | null;
        readonly title: string | null;
        readonly description: string | null;
    } | null;
    readonly " $refType": "PartnerMeta_partner";
};
export type PartnerMeta_partner$data = PartnerMeta_partner;
export type PartnerMeta_partner$key = {
    readonly " $data"?: PartnerMeta_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerMeta_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerMeta_partner",
  "selections": [
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
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "image",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Partner"
};
(node as any).hash = '12c08f812d24c20b5573524970cb545e';
export default node;
