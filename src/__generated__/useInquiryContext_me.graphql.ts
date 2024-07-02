/**
 * @generated SignedSource<<a83d96e29ef437e5debfebcafdc1872a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useInquiryContext_me$data = {
  readonly collectorLevel: number | null | undefined;
  readonly collectorProfile: {
    readonly lastUpdatePromptAt: string | null | undefined;
  } | null | undefined;
  readonly location: {
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly state: string | null | undefined;
  } | null | undefined;
  readonly otherRelevantPositions: string | null | undefined;
  readonly profession: string | null | undefined;
  readonly shareFollows: boolean;
  readonly userInterestsConnection: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useInquiryContext_me";
};
export type useInquiryContext_me$key = {
  readonly " $data"?: useInquiryContext_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"useInquiryContext_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useInquiryContext_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "collectorLevel",
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
          "name": "state",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "postalCode",
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
      "name": "otherRelevantPositions",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "shareFollows",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "interestType",
          "value": "ARTIST"
        }
      ],
      "concreteType": "UserInterestConnection",
      "kind": "LinkedField",
      "name": "userInterestsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": "userInterestsConnection(first:1,interestType:\"ARTIST\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorProfileType",
      "kind": "LinkedField",
      "name": "collectorProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastUpdatePromptAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "3add8c17a1b710742b83e82e37eab173";

export default node;
