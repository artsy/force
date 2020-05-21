/* tslint:disable */

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
  "kind": "Fragment",
  "name": "FollowGeneButton_gene",
  "type": "Gene",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_followed",
      "name": "isFollowed",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '27bbf9c0d8426586f13fe1dacb54b489';
export default node;
