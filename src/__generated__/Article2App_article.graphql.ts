/**
 * @generated SignedSource<<b9bfdd9a93d09a2a540a0090643f6a82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Article2App_article$data = {
  readonly authors: ReadonlyArray<{
    readonly initials: string | null;
    readonly name: string | null;
  }>;
  readonly sections: ReadonlyArray<string>;
  readonly title: string | null;
  readonly " $fragmentType": "Article2App_article";
};
export type Article2App_article$key = {
  readonly " $data"?: Article2App_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"Article2App_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Article2App_article",
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
      "concreteType": "Author",
      "kind": "LinkedField",
      "name": "authors",
      "plural": true,
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
          "args": null,
          "kind": "ScalarField",
          "name": "initials",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sections",
      "storageKey": null
    }
  ],
  "type": "ContentfulArticle",
  "abstractKey": null
};

(node as any).hash = "5c9c56d6b7b598cff1c905bf3b32671a";

export default node;
