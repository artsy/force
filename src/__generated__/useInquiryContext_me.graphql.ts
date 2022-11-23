/**
 * @generated SignedSource<<c8b146d89c73e6bc65252b522a3dfcf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useInquiryContext_me$data = {
  readonly collectorLevel: number | null;
  readonly location: {
    readonly city: string | null;
  } | null;
  readonly otherRelevantPositions: string | null;
  readonly profession: string | null;
  readonly shareFollows: boolean;
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "c0c1a7db2bdd89bbf53666b0c0e61b1b";

export default node;
