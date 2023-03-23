/**
 * @generated SignedSource<<fd08342b61f2b9cba5267279f24870cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSavesAndFollowsRoute_me$data = {
  readonly name: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSaves2Route_me">;
  readonly " $fragmentType": "CollectorProfileSavesAndFollowsRoute_me";
};
export type CollectorProfileSavesAndFollowsRoute_me$key = {
  readonly " $data"?: CollectorProfileSavesAndFollowsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSavesAndFollowsRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileSavesAndFollowsRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileSaves2Route_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "c80e85e41edcb9deee3f8926711650a1";

export default node;
