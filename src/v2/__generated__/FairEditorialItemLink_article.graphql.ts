/**
 * @generated SignedSource<<8fc3e330d2bbd7bd00901fb335a7b3ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairEditorialItemLink_article$data = {
  readonly internalID: string;
  readonly slug: string | null;
  readonly title: string | null;
  readonly href: string | null;
  readonly publishedAt: string | null;
  readonly " $fragmentType": "FairEditorialItemLink_article";
};
export type FairEditorialItemLink_article$key = {
  readonly " $data"?: FairEditorialItemLink_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairEditorialItemLink_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairEditorialItemLink_article",
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMMM D, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMMM D, YYYY\")"
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "b96947b93b0b94cbd70e096fc3495451";

export default node;
