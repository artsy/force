/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowInfo_show = {
    readonly name: string | null;
    readonly about: string | null;
    readonly pressRelease: string | null;
    readonly hasLocation: boolean | null;
    readonly events: ReadonlyArray<{
        readonly dateTimeRange: string | null;
        readonly description: string | null;
        readonly eventType: string | null;
        readonly title: string | null;
    } | null> | null;
    readonly partner: ({
        readonly __typename: "Partner";
        readonly type: string | null;
        readonly " $fragmentRefs": FragmentRefs<"EntityHeaderPartner_partner">;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly " $fragmentRefs": FragmentRefs<"ShowInfoLocation_show" | "ShowHours_show">;
    readonly " $refType": "ShowInfo_show";
};
export type ShowInfo_show$data = ShowInfo_show;
export type ShowInfo_show$key = {
    readonly " $data"?: ShowInfo_show$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShowInfo_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowInfo_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "about",
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "pressRelease",
      "storageKey": "pressRelease(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasLocation",
      "storageKey": null
    },
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
          "name": "dateTimeRange",
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
          "name": "eventType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EntityHeaderPartner_partner"
            }
          ],
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowInfoLocation_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowHours_show"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
(node as any).hash = 'fec6d5d1a6d802b0be2ddd9e4b3f4630';
export default node;
