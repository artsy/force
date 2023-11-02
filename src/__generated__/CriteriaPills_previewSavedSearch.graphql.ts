/**
 * @generated SignedSource<<1f3016c1bfe39ba2bd614e672765b3e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CriteriaPills_previewSavedSearch$data = {
  readonly labels: ReadonlyArray<{
    readonly displayValue: string;
    readonly field: string;
    readonly value: string;
  } | null>;
  readonly " $fragmentType": "CriteriaPills_previewSavedSearch";
};
export type CriteriaPills_previewSavedSearch$key = {
  readonly " $data"?: CriteriaPills_previewSavedSearch$data;
  readonly " $fragmentSpreads": FragmentRefs<"CriteriaPills_previewSavedSearch">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CriteriaPills_previewSavedSearch",
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
          "name": "displayValue",
          "storageKey": null
        },
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

(node as any).hash = "dabc47643efeaa5a657641118e29b94a";

export default node;
