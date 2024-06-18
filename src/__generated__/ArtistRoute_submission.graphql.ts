/**
 * @generated SignedSource<<18acda3c0329298bafcb34749999620c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRoute_submission$data = {
  readonly artist: {
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly targetSupply: {
      readonly isTargetSupply: boolean | null | undefined;
    };
  } | null | undefined;
  readonly internalID: string | null | undefined;
  readonly " $fragmentType": "ArtistRoute_submission";
};
export type ArtistRoute_submission$key = {
  readonly " $data"?: ArtistRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistRoute_submission">;
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
  "name": "ArtistRoute_submission",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistTargetSupply",
          "kind": "LinkedField",
          "name": "targetSupply",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isTargetSupply",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};
})();

(node as any).hash = "86fb9dcc510e71adcc0b29ed0f2ffbb2";

export default node;
