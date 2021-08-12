/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorsGroup_partnersConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
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
(node as any).hash = '2d45200d0f13859b5bc8d7cf5a77f482';
export default node;
