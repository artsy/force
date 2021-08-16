/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorsGroup_partnersConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly internalID: string;
            readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_partner">;
        } | null;
    } | null> | null;
    readonly " $refType": "FairExhibitorsGroup_partnersConnection";
};
export type FairExhibitorsGroup_partnersConnection$data = FairExhibitorsGroup_partnersConnection;
export type FairExhibitorsGroup_partnersConnection$key = {
    readonly " $data"?: FairExhibitorsGroup_partnersConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorsGroup_partnersConnection">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorsGroup_partnersConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Partner",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "FairExhibitorCard_partner"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PartnerConnection"
};
(node as any).hash = '0c9e876ab26b7f898f051636f20cd17c';
export default node;
