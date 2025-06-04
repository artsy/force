/**
 * @generated SignedSource<<c3035799f25a8f320bda98646a8efd02>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerMeta_partner$data = {
  readonly meta: {
    readonly description: string | null | undefined;
    readonly image: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerMetaStructuredData_partner">;
  readonly " $fragmentType": "PartnerMeta_partner";
};
export type PartnerMeta_partner$key = {
  readonly " $data"?: PartnerMeta_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerMeta_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerMeta_partner",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerMetaStructuredData_partner"
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "2d13af1d1398c7b1b7d3cb9d0e5ec54b";

export default node;
