/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OtherCollectionEntity_member = {
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
  "kind": "Fragment",
  "name": "OtherCollectionEntity_member",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "thumbnail",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '9240c380fecb65bb0486a4b0f4fd151b';
export default node;
