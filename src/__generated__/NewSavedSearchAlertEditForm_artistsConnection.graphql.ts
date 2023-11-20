/**
 * @generated SignedSource<<5ceb067fbacb0b103840489350d64384>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewSavedSearchAlertEditForm_artistsConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly name: string | null;
      readonly slug: string;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "NewSavedSearchAlertEditForm_artistsConnection";
};
export type NewSavedSearchAlertEditForm_artistsConnection$key = {
  readonly " $data"?: NewSavedSearchAlertEditForm_artistsConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewSavedSearchAlertEditForm_artistsConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewSavedSearchAlertEditForm_artistsConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artist",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
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
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistConnection",
  "abstractKey": null
};

(node as any).hash = "53eb21489f5be6232ea40d11da46db2e";

export default node;
