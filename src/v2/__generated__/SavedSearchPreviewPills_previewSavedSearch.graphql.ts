/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchPreviewPills_previewSavedSearch = {
    readonly labels: ReadonlyArray<{
        readonly field: string;
        readonly displayValue: string;
        readonly value: string;
    } | null>;
    readonly " $refType": "SavedSearchPreviewPills_previewSavedSearch";
};
export type SavedSearchPreviewPills_previewSavedSearch$data = SavedSearchPreviewPills_previewSavedSearch;
export type SavedSearchPreviewPills_previewSavedSearch$key = {
    readonly " $data"?: SavedSearchPreviewPills_previewSavedSearch$data;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchPreviewPills_previewSavedSearch">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchPreviewPills_previewSavedSearch",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SearchCriteriaLabel",
      "kind": "LinkedField",
      "name": "labels",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "field",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PreviewSavedSearch",
  "abstractKey": null
};
(node as any).hash = 'b078cf083ea16c33ec4db410427cd7a2';
export default node;
