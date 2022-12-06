/**
 * @generated SignedSource<<2025ab8731cea7c9e5d237942badd629>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileHeaderInfo_me$data = {
  readonly location: {
    readonly display: string | null;
  } | null;
  readonly otherRelevantPositions: string | null;
  readonly profession: string | null;
  readonly " $fragmentType": "CollectorProfileHeaderInfo_me";
};
export type CollectorProfileHeaderInfo_me$key = {
  readonly " $data"?: CollectorProfileHeaderInfo_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderInfo_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileHeaderInfo_me",
  "selections": [
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
        }
      ],
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
      "name": "otherRelevantPositions",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "2f92a69686aa0e51b406e741772c5356";

export default node;
