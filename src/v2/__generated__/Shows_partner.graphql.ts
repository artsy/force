/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Shows_partner = {
    readonly slug: string;
    readonly currentEvents: {
        readonly edges: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"ShowEvents_edges">;
        } | null> | null;
    } | null;
    readonly upcomingEvents: {
        readonly edges: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"ShowEvents_edges">;
        } | null> | null;
    } | null;
    readonly " $refType": "Shows_partner";
};
export type Shows_partner$data = Shows_partner;
export type Shows_partner$key = {
    readonly " $data"?: Shows_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"Shows_partner">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ShowEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ShowEvents_edges"
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shows_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "currentEvents",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "status",
          "value": "RUNNING"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "showsConnection(first:12,status:\"RUNNING\")"
    },
    {
      "alias": "upcomingEvents",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "status",
          "value": "UPCOMING"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "showsConnection(first:12,status:\"UPCOMING\")"
    }
  ],
  "type": "Partner"
};
})();
(node as any).hash = '38a4d2c65f4388388bbe0ae5af18ab81';
export default node;
