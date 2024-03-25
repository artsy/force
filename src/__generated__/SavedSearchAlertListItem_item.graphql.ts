/**
 * @generated SignedSource<<6db853ada7e1511682dd61035a4bbc12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertListItem_item$data = {
  readonly artistIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly artistSeriesIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly artworksConnection: {
    readonly counts: {
      readonly total: any | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly settings: {
    readonly name: string | null | undefined;
  };
  readonly subtitle: string;
  readonly title: string;
  readonly " $fragmentType": "SavedSearchAlertListItem_item";
};
export type SavedSearchAlertListItem_item$key = {
  readonly " $data"?: SavedSearchAlertListItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertListItem_item">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "artistIDs"
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertListItem_item",
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
      "name": "artistIDs",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistSeriesIDs",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": "title",
      "args": [
        {
          "kind": "Literal",
          "name": "only",
          "value": (v0/*: any*/)
        }
      ],
      "kind": "ScalarField",
      "name": "displayName",
      "storageKey": "displayName(only:[\"artistIDs\"])"
    },
    {
      "alias": "subtitle",
      "args": [
        {
          "kind": "Literal",
          "name": "except",
          "value": (v0/*: any*/)
        }
      ],
      "kind": "ScalarField",
      "name": "displayName",
      "storageKey": "displayName(except:[\"artistIDs\"])"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "total",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:10)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AlertSettings",
      "kind": "LinkedField",
      "name": "settings",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Alert",
  "abstractKey": null
};
})();

(node as any).hash = "6754ef48b4ac60a0bcf9ef63af2bc04b";

export default node;
