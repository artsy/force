/**
 * @generated SignedSource<<feee13e546f476c0b062814eb9f7c4cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherCollectionEntity_member$data = {
  readonly id: string;
  readonly slug: string;
  readonly thumbnail: string | null | undefined;
  readonly title: string;
  readonly " $fragmentType": "OtherCollectionEntity_member";
};
export type OtherCollectionEntity_member$key = {
  readonly " $data"?: OtherCollectionEntity_member$data;
  readonly " $fragmentSpreads": FragmentRefs<"OtherCollectionEntity_member">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OtherCollectionEntity_member",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnail",
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
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "ae069d7d2cf1284dbee48601931755b6";

export default node;
