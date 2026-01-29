/**
 * @generated SignedSource<<277cde145b60a37d7d6f363099e9cbe3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReport_artwork$data = {
  readonly id: string;
  readonly internalID: string;
  readonly saleArtwork: {
    readonly internalID: string;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "RequestConditionReport_artwork";
};
export type RequestConditionReport_artwork$key = {
  readonly " $data"?: RequestConditionReport_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"RequestConditionReport_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestConditionReport_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "e030c56e392d864de9a910380af4a441";

export default node;
