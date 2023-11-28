/**
 * @generated SignedSource<<c93dac9511e64c7d21c49b7ba84a07d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowInfo_show$data = {
  readonly about: string | null | undefined;
  readonly events: ReadonlyArray<{
    readonly dateTimeRange: string | null | undefined;
    readonly description: string | null | undefined;
    readonly eventType: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly hasLocation: boolean | null | undefined;
  readonly name: string | null | undefined;
  readonly partner: {
    readonly __typename: "Partner";
    readonly type: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderPartner_partner">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly pressRelease: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ShowHours_show" | "ShowInfoLocation_show">;
  readonly " $fragmentType": "ShowInfo_show";
};
export type ShowInfo_show$key = {
  readonly " $data"?: ShowInfo_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowInfo_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowInfo_show",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowInfoLocation_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowHours_show"
    },
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "EntityHeaderPartner_partner"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            }
          ],
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "fec6d5d1a6d802b0be2ddd9e4b3f4630";

export default node;
