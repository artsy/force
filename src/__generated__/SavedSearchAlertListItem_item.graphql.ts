/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertListItem_item = {
    readonly internalID: string;
    readonly artistIDs: ReadonlyArray<string> | null;
    readonly href: string;
    readonly labels: ReadonlyArray<{
        readonly displayValue: string;
    }>;
    readonly userAlertSettings: {
        readonly name: string | null;
    };
    readonly " $refType": "SavedSearchAlertListItem_item";
};
export type SavedSearchAlertListItem_item$data = SavedSearchAlertListItem_item;
export type SavedSearchAlertListItem_item$key = {
    readonly " $data"?: SavedSearchAlertListItem_item$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertListItem_item">;
};



const node: ReaderFragment = {
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
      "name": "href",
      "storageKey": null
    },
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SavedSearchUserAlertSettings",
      "kind": "LinkedField",
      "name": "userAlertSettings",
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
  "type": "SearchCriteria",
  "abstractKey": null
};
(node as any).hash = 'fe0b5b2fbd78d012e3bbf601026a5ece';
export default node;
