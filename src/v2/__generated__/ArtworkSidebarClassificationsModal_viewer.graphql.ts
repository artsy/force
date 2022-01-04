/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassificationsModal_viewer = {
    readonly artworkAttributionClasses: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly longDescription: string | null;
    } | null> | null;
    readonly " $refType": "ArtworkSidebarClassificationsModal_viewer";
};
export type ArtworkSidebarClassificationsModal_viewer$data = ArtworkSidebarClassificationsModal_viewer;
export type ArtworkSidebarClassificationsModal_viewer$key = {
    readonly " $data"?: ArtworkSidebarClassificationsModal_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarClassificationsModal_viewer">;
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
  "type": "Viewer"
};
(node as any).hash = '0c6d5da0f8afc199e5112214cda6ef0f';
export default node;
