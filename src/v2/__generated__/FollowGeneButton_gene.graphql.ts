/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButton_gene = {
    readonly id: string;
    readonly slug: string;
    readonly name: string | null;
    readonly internalID: string;
    readonly isFollowed: boolean | null;
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
      "name": "slug",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    }
  ],
  "type": "Gene",
  "abstractKey": null
};
(node as any).hash = '0f37f40727c4b161b6e595176e33df86';
export default node;
