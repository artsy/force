/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_fair = {
    readonly id: string;
    readonly exhibitors: {
        readonly edges: ReadonlyArray<{
            readonly show: {
                readonly id: string;
                readonly counts: {
                    readonly artworks: number | null;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"FairExhibitorRail_show">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairExhibitors_fair";
};
export type FairExhibitors_fair$data = FairExhibitors_fair;
export type FairExhibitors_fair$key = {
    readonly " $data"?: FairExhibitors_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitors_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitors_fair",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "exhibitors",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "FEATURED_ASC"
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
              "alias": "show",
              "args": null,
              "concreteType": "Show",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ShowCounts",
                  "kind": "LinkedField",
                  "name": "counts",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "artworks",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FairExhibitorRail_show"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "showsConnection(first:30,sort:\"FEATURED_ASC\")"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '449e42063442fcd15d169285d7b4347a';
export default node;
