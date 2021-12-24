/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaHome_system = {
    readonly algolia: {
        readonly apiKey: string;
        readonly appID: string;
    } | null;
    readonly " $refType": "AlgoliaHome_system";
};
export type AlgoliaHome_system$data = AlgoliaHome_system;
export type AlgoliaHome_system$key = {
    readonly " $data"?: AlgoliaHome_system$data;
    readonly " $fragmentRefs": FragmentRefs<"AlgoliaHome_system">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlgoliaHome_system",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Algolia",
      "kind": "LinkedField",
      "name": "algolia",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "apiKey",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "appID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "System"
};
(node as any).hash = 'd5a75fe3ef0b2b520ce1a24e61f668ba';
export default node;
