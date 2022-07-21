/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowEvents_show = {
    readonly events: ReadonlyArray<{
        readonly title: string | null;
        readonly eventType: string | null;
        readonly description: string | null;
        readonly startAt: string | null;
        readonly endAt: string | null;
    } | null> | null;
    readonly internalID: string;
    readonly " $refType": "ShowEvents_show";
};
export type ShowEvents_show$data = ShowEvents_show;
export type ShowEvents_show$key = {
    readonly " $data"?: ShowEvents_show$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShowEvents_show">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM Do YYYY"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowEvents_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ShowEventType",
      "kind": "LinkedField",
      "name": "events",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eventType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": (v0/*: any*/),
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": "startAt(format:\"MMM Do YYYY\")"
        },
        {
          "alias": null,
          "args": (v0/*: any*/),
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": "endAt(format:\"MMM Do YYYY\")"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();
(node as any).hash = 'bccf702355400e402fecef86d3e385ac';
export default node;
