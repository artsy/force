/**
 * @generated SignedSource<<6797581f36a863469d2c35291ad52918>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleTimestamp_article$data = {
  readonly publishedAt: string | null | undefined;
  readonly updatedAt: string | null | undefined;
  readonly " $fragmentType": "ArticleTimestamp_article";
};
export type ArticleTimestamp_article$key = {
  readonly " $data"?: ArticleTimestamp_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleTimestamp_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleTimestamp_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "9277a36346963f0a58caa95e9a257d32";

export default node;
