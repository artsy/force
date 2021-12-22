/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaApp_system = {
    readonly algolia: {
        readonly apiKey: string;
        readonly appID: string;
    } | null;
    readonly " $refType": "AlgoliaApp_system";
};
export type AlgoliaApp_system$data = AlgoliaApp_system;
export type AlgoliaApp_system$key = {
    readonly " $data"?: AlgoliaApp_system$data;
    readonly " $fragmentRefs": FragmentRefs<"AlgoliaApp_system">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlgoliaApp_system",
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
(node as any).hash = 'ce1b384586d618bff796e610f46ba74b';
export default node;
