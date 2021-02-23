/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurrentAuctions_currentAuctions = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
        } | null;
    } | null> | null;
    readonly " $refType": "CurrentAuctions_currentAuctions";
};
export type CurrentAuctions_currentAuctions$data = CurrentAuctions_currentAuctions;
export type CurrentAuctions_currentAuctions$key = {
    readonly " $data"?: CurrentAuctions_currentAuctions$data;
    readonly " $fragmentRefs": FragmentRefs<"CurrentAuctions_currentAuctions">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurrentAuctions_currentAuctions",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Sale",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleConnection"
};
(node as any).hash = 'c24dc634615bf1c4819aa69868edeca4';
export default node;
