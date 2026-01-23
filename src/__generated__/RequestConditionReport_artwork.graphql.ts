/**
 * @generated SignedSource<<5369dee3660a0e50697c64ca1b782828>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReport_artwork$data = {
  readonly image: {
    readonly aspectRatio: number;
    readonly blurhash: string | null | undefined;
    readonly url: string | null | undefined;
  } | null | undefined;
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "main"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"main\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "blurhash",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "23736293941e41814eb32569275d5b26";

export default node;
