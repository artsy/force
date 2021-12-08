/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_submission = {
    readonly id: string;
    readonly assets: ReadonlyArray<{
        readonly id: string;
        readonly imageUrls: unknown | null;
        readonly geminiToken: string | null;
    } | null> | null;
    readonly " $refType": "UploadPhotos_submission";
};
export type UploadPhotos_submission$data = UploadPhotos_submission;
export type UploadPhotos_submission$key = {
    readonly " $data"?: UploadPhotos_submission$data;
    readonly " $fragmentRefs": FragmentRefs<"UploadPhotos_submission">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadPhotos_submission",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ConsignmentSubmissionCategoryAsset",
      "kind": "LinkedField",
      "name": "assets",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "imageUrls",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "geminiToken",
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
(node as any).hash = '5b46db31278b661bd98701c9643efc03';
export default node;
