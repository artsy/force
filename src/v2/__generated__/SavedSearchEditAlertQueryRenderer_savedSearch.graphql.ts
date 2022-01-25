/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchEditAlertQueryRenderer_savedSearch = {
    readonly userAlertSettings: {
        readonly name: string | null;
    };
    readonly " $refType": "SavedSearchEditAlertQueryRenderer_savedSearch";
};
export type SavedSearchEditAlertQueryRenderer_savedSearch$data = SavedSearchEditAlertQueryRenderer_savedSearch;
export type SavedSearchEditAlertQueryRenderer_savedSearch$key = {
    readonly " $data"?: SavedSearchEditAlertQueryRenderer_savedSearch$data;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchEditAlertQueryRenderer_savedSearch">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchEditAlertQueryRenderer_savedSearch",
  "selections": [
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
(node as any).hash = '451bf8db1084bf50ad9372053482d329';
export default node;
