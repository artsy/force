/**
 * @generated SignedSource<<dae6245012dc29f8169b2d40819930d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Header_collection$data = {
  readonly category: string;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "Header_collection";
};
export type Header_collection$key = {
  readonly " $data"?: Header_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"Header_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": "description",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "markdownDescription",
      "storageKey": "markdownDescription(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "74cf06890d9a09b7ade06115aa46dde2";

export default node;
