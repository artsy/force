/**
 * @generated SignedSource<<65e1fa8df4f623d5fba40ba1ad9ce486>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassificationsModal_viewer$data = {
  readonly artworkAttributionClasses: ReadonlyArray<{
    readonly id: string;
    readonly name: string | null;
    readonly longDescription: string | null;
  } | null> | null;
  readonly " $fragmentType": "ArtworkSidebarClassificationsModal_viewer";
};
export type ArtworkSidebarClassificationsModal_viewer$key = {
  readonly " $data"?: ArtworkSidebarClassificationsModal_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarClassificationsModal_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarClassificationsModal_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "artworkAttributionClasses",
      "plural": true,
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "longDescription",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "0c6d5da0f8afc199e5112214cda6ef0f";

export default node;
