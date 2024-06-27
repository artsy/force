/**
 * @generated SignedSource<<841f0ea33635fe7ed82cb1586aae526c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfo_me$data = {
  readonly location: {
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly display: string | null | undefined;
    readonly state: string | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly otherRelevantPositions: string | null | undefined;
  readonly profession: string | null | undefined;
  readonly " $fragmentType": "InquiryBasicInfo_me";
};
export type InquiryBasicInfo_me$key = {
  readonly " $data"?: InquiryBasicInfo_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"InquiryBasicInfo_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InquiryBasicInfo_me",
  "selections": [
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
      "concreteType": "MyLocation",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        },
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "342984bd38b6508f58e94951289cefdc";

export default node;
