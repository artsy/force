/**
 * @generated SignedSource<<80b865af5c28a9560b419bf76a7e7053>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewSaveButton_artwork$data = {
  readonly id: string;
  readonly internalID: string;
  readonly slug: string;
  readonly is_saved: boolean | null;
  readonly title: string | null;
  readonly " $fragmentType": "NewSaveButton_artwork";
};
export type NewSaveButton_artwork$key = {
  readonly " $data"?: NewSaveButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewSaveButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewSaveButton_artwork",
  "selections": [
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
      "alias": "is_saved",
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
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
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "dce2962e7f037b568a6104148a9600f1";

export default node;
