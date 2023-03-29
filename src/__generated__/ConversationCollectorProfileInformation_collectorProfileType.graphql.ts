/**
 * @generated SignedSource<<f4a6183d14706d4fefe81a1436c59f32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationCollectorProfileInformation_collectorProfileType$data = {
  readonly bio: string | null;
  readonly collectorProfileArtists: ReadonlyArray<{
    readonly name: string | null;
  } | null> | null;
  readonly confirmedBuyerAt: string | null;
  readonly isActiveBidder: boolean | null;
  readonly isActiveInquirer: boolean | null;
  readonly location: {
    readonly city: string | null;
    readonly country: string | null;
  } | null;
  readonly otherRelevantPositions: string | null;
  readonly profession: string | null;
  readonly " $fragmentType": "ConversationCollectorProfileInformation_collectorProfileType";
};
export type ConversationCollectorProfileInformation_collectorProfileType$key = {
  readonly " $data"?: ConversationCollectorProfileInformation_collectorProfileType$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileInformation_collectorProfileType">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationCollectorProfileInformation_collectorProfileType",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profession",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MyLocation",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActiveInquirer",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActiveBidder",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "confirmedBuyerAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "otherRelevantPositions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorProfileArtists",
      "kind": "LinkedField",
      "name": "collectorProfileArtists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CollectorProfileType",
  "abstractKey": null
};

(node as any).hash = "2b84402c6718045d5de43226f409b3bb";

export default node;
