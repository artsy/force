/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkClassifications_viewer = {
    readonly artworkAttributionClasses: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly longDescription: string | null;
    } | null> | null;
    readonly " $refType": "ArtworkClassifications_viewer";
};
export type ArtworkClassifications_viewer$data = ArtworkClassifications_viewer;
export type ArtworkClassifications_viewer$key = {
    readonly " $data"?: ArtworkClassifications_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkClassifications_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkClassifications_viewer",
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
(node as any).hash = '60146ae6d9196b132d4aadc948195461';
export default node;
