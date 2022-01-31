/**
 * @generated SignedSource<<77f271a3f7741899b1bdd6ccf677fb55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Auction2Meta_sale$data = {
  readonly name: string | null;
  readonly description: string | null;
  readonly slug: string;
  readonly " $fragmentType": "Auction2Meta_sale";
};
export type Auction2Meta_sale$key = {
  readonly " $data"?: Auction2Meta_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"Auction2Meta_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2Meta_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "c76adbcad1cb888efa03fa7caabf9358";

export default node;
