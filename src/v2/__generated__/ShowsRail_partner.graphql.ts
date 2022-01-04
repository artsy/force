/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsRail_partner = {
    readonly slug: string;
    readonly displayFullPartnerPage: boolean | null;
    readonly showsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ShowCard_show">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ShowsRail_partner";
};
export type ShowsRail_partner$data = ShowsRail_partner;
export type ShowsRail_partner$key = {
    readonly " $data"?: ShowsRail_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowsRail_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsRail_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayFullPartnerPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 19
        },
        {
          "kind": "Literal",
          "name": "isDisplayable",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "ALL"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ShowEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Show",
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
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShowCard_show"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "showsConnection(first:19,isDisplayable:true,status:\"ALL\")"
    }
  ],
  "type": "Partner"
};
(node as any).hash = '4e547524cd3e0462299f54f5ff932a5d';
export default node;
