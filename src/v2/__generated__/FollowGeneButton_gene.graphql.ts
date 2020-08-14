/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButton_gene = {
    readonly id: string;
    readonly internalID: string;
    readonly is_followed: boolean | null;
    readonly " $refType": "FollowGeneButton_gene";
};
export type FollowGeneButton_gene$data = FollowGeneButton_gene;
export type FollowGeneButton_gene$key = {
    readonly " $data"?: FollowGeneButton_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowGeneButton_gene">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowGeneButton_gene",
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
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": "is_followed",
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    }
  ],
  "type": "Gene"
};
(node as any).hash = '27bbf9c0d8426586f13fe1dacb54b489';
export default node;
