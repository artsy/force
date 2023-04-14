/**
 * @generated SignedSource<<fc5b75e224878bdc7ab6dfdd3610bf1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSavesAndFollowsRoute_me$data = {
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileSaves2Route_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "7d6e841a6acb85de872d896dd62bd08d";

export default node;
