/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeaderImage_fair = {
    readonly image: {
        readonly sm: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly md: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly lg: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "FairHeaderImage_fair";
};
export type FairHeaderImage_fair$data = FairHeaderImage_fair;
export type FairHeaderImage_fair$key = {
    readonly " $data"?: FairHeaderImage_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderImage_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "height",
  "value": 600
},
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeaderImage_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "sm",
          "args": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 480
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:600,version:\"wide\",width:480)"
        },
        {
          "alias": "md",
          "args": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 900
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:600,version:\"wide\",width:900)"
        },
        {
          "alias": "lg",
          "args": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1600
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:600,version:\"wide\",width:1600)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '3dc345ccfcbe7c6919d58dd5fd138088';
export default node;
