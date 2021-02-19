/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpcomingAuctions_upcomingAuctions = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
        } | null;
    } | null> | null;
    readonly " $refType": "UpcomingAuctions_upcomingAuctions";
};
export type UpcomingAuctions_upcomingAuctions$data = UpcomingAuctions_upcomingAuctions;
export type UpcomingAuctions_upcomingAuctions$key = {
    readonly " $data"?: UpcomingAuctions_upcomingAuctions$data;
    readonly " $fragmentRefs": FragmentRefs<"UpcomingAuctions_upcomingAuctions">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpcomingAuctions_upcomingAuctions",
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
(node as any).hash = 'fb61d6e85fd8eccdbc14994dc2762824';
export default node;
