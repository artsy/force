/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OtherCollectionEntity_member = {
    readonly id: string;
    readonly slug: string;
    readonly thumbnail: string | null;
    readonly title: string;
    readonly " $refType": "OtherCollectionEntity_member";
};
export type OtherCollectionEntity_member$data = OtherCollectionEntity_member;
export type OtherCollectionEntity_member$key = {
    readonly " $data"?: OtherCollectionEntity_member$data;
    readonly " $fragmentRefs": FragmentRefs<"OtherCollectionEntity_member">;
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
  "type": "MarketingCollection"
};
(node as any).hash = 'ae069d7d2cf1284dbee48601931755b6';
export default node;
