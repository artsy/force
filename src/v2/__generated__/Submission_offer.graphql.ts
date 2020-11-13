/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Submission_offer = {
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
    readonly " $refType": "Submission_offer";
};
export type Submission_offer$data = Submission_offer;
export type Submission_offer$key = {
    readonly " $data"?: Submission_offer$data;
    readonly " $fragmentRefs": FragmentRefs<"Submission_offer">;
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
  "name": "Submission_offer",
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
  "type": "ConsignmentOffer"
};
})();
(node as any).hash = '3c52dd5d244c4ccbc41791ce08f70692';
export default node;
