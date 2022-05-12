/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SubmissionSummary_offer = {
    readonly submission: {
        readonly artist: {
            readonly name: string | null;
        } | null;
        readonly title: string | null;
        readonly year: string | null;
        readonly assets: ReadonlyArray<{
            readonly imageUrls: unknown | null;
        } | null> | null;
        readonly primaryImage: {
            readonly imageUrls: unknown | null;
        } | null;
    };
    readonly " $refType": "SubmissionSummary_offer";
};
export type SubmissionSummary_offer$data = SubmissionSummary_offer;
export type SubmissionSummary_offer$key = {
    readonly " $data"?: SubmissionSummary_offer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SubmissionSummary_offer">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "imageUrls",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionSummary_offer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ConsignmentSubmission",
      "kind": "LinkedField",
      "name": "submission",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artist",
          "kind": "LinkedField",
          "name": "artist",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "year",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ConsignmentSubmissionCategoryAsset",
          "kind": "LinkedField",
          "name": "assets",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ConsignmentSubmissionCategoryAsset",
          "kind": "LinkedField",
          "name": "primaryImage",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentOffer",
  "abstractKey": null
};
})();
(node as any).hash = 'f5e1a0b923edc7fa6da599850e5fc957';
export default node;
