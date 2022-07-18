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



const node: ReaderFragment = {
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
          "args": null,
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": null
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
(node as any).hash = 'b87b5b521854b56b0926cceb65192e4b';
export default node;
