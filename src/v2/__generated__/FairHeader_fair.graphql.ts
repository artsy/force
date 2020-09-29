/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeader_fair = {
    readonly about: string | null;
    readonly summary: string | null;
    readonly name: string | null;
    readonly slug: string;
    readonly tagline: string | null;
    readonly location: {
        readonly summary: string | null;
    } | null;
    readonly ticketsLink: string | null;
    readonly hours: string | null;
    readonly links: string | null;
    readonly tickets: string | null;
    readonly contact: string | null;
    readonly " $fragmentRefs": FragmentRefs<"FairTiming_fair" | "FairHeaderImage_fair">;
    readonly " $refType": "FairHeader_fair";
};
export type FairHeader_fair$data = FairHeader_fair;
export type FairHeader_fair$key = {
    readonly " $data"?: FairHeader_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeader_fair",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": "summary(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
      "name": "tagline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "summary",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ticketsLink",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "hours",
      "storageKey": "hours(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "links",
      "storageKey": "links(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "tickets",
      "storageKey": "tickets(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "contact",
      "storageKey": "contact(format:\"HTML\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairTiming_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeaderImage_fair"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = 'aef5f85e7bb13eff5895a86fc2a0b059';
export default node;
