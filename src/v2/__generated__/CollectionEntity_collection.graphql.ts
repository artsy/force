/**
 * @generated SignedSource<<5601dbe88bc0dcc43341126a6a2d6662>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionEntity_collection$data = {
  readonly slug: string;
  readonly headerImage: string | null;
  readonly title: string;
  readonly price_guidance: number | null;
  readonly show_on_editorial: boolean;
  readonly " $fragmentType": "CollectionEntity_collection";
};
export type CollectionEntity_collection$key = {
  readonly " $data"?: CollectionEntity_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionEntity_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectionEntity_collection",
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
      "name": "headerImage",
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
      "alias": "price_guidance",
      "args": null,
      "kind": "ScalarField",
      "name": "priceGuidance",
      "storageKey": null
    },
    {
      "alias": "show_on_editorial",
      "args": null,
      "kind": "ScalarField",
      "name": "showOnEditorial",
      "storageKey": null
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "7b6be8924b3cafab86730578ebf5c997";

export default node;
