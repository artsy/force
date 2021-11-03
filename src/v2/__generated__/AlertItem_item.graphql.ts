/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertItem_item = {
    readonly internalID: string;
    readonly userAlertSettings: {
        readonly name: string | null;
    };
    readonly " $refType": "AlertItem_item";
};
export type AlertItem_item$data = AlertItem_item;
export type AlertItem_item$key = {
    readonly " $data"?: AlertItem_item$data;
    readonly " $fragmentRefs": FragmentRefs<"AlertItem_item">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlertItem_item",
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
  "type": "SearchCriteria"
};
(node as any).hash = '24c74f21ca47b0cebce3faeca58fd570';
export default node;
