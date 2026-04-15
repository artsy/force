/**
 * @generated SignedSource<<92e1b86e735073a658297dc6347e3cb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleVisibilityMetadata_article$data = {
  readonly href: string | null | undefined;
  readonly searchTitle: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArticleVisibilityMetadata_article";
};
export type ArticleVisibilityMetadata_article$key = {
  readonly " $data"?: ArticleVisibilityMetadata_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleVisibilityMetadata_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleVisibilityMetadata_article",
  "selections": [
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
      "name": "searchTitle",
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
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "f727edc2a5b4a2b65eb482c0d0d3c0fc";

export default node;
