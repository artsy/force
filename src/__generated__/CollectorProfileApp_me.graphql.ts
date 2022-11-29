/**
 * @generated SignedSource<<68aee7b70dc1691a25d188f949d719ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileApp_me$data = {
  readonly name: string | null;
  readonly " $fragmentType": "CollectorProfileApp_me";
};
export type CollectorProfileApp_me$key = {
  readonly " $data"?: CollectorProfileApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "c8fec2a103b7045898d65c1110f838a0";

export default node;
