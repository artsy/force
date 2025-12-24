/**
 * @generated SignedSource<<f4596e1dad00e67773a8b61e76627cb5>>
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
              "value": "x-large"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"x-large\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
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

(node as any).hash = "4a9463cb27950a24facd829c61a03c94";

export default node;
