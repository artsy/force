/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerHeaderImage_profile = {
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
    readonly " $refType": "PartnerHeaderImage_profile";
};
export type PartnerHeaderImage_profile$data = PartnerHeaderImage_profile;
export type PartnerHeaderImage_profile$key = {
    readonly " $data"?: PartnerHeaderImage_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerHeaderImage_profile">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v1 = [
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
],
v2 = {
  "kind": "Literal",
  "name": "height",
  "value": 600
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerHeaderImage_profile",
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
            {
              "kind": "Literal",
              "name": "height",
              "value": 280
            },
            (v0/*: any*/),
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
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:280,version:\"wide\",width:480)"
        },
        {
          "alias": "md",
          "args": [
            (v2/*: any*/),
            (v0/*: any*/),
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
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:600,version:\"wide\",width:900)"
        },
        {
          "alias": "lg",
          "args": [
            (v2/*: any*/),
            (v0/*: any*/),
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
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:600,version:\"wide\",width:1600)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Profile"
};
})();
(node as any).hash = '209a681e2b3f645fa738dc6bae7ebc74';
export default node;
