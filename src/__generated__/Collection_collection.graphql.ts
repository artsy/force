/**
 * @generated SignedSource<<da402d0bd02e79b8cc21f065313ea9ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Collection_collection$data = {
  readonly descriptionMarkdown: string | null | undefined;
  readonly headerImage: string | null | undefined;
  readonly showFeaturedArtists: boolean;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"Header_collection">;
  readonly " $fragmentType": "Collection_collection";
};
export type Collection_collection$key = {
  readonly " $data"?: Collection_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"Collection_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Collection_collection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_collection"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "descriptionMarkdown",
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
      "name": "showFeaturedArtists",
      "storageKey": null
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "0073995c658314c7475a9c2040915ab0";

export default node;
