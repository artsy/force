/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeaderImage_fair = {
    readonly name: string | null;
    readonly image: {
        readonly small: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
            readonly height: number;
        } | null;
        readonly medium: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly large: {
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderIcon_fair">;
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
  "name": "version",
  "value": "wide"
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeaderImage_fair",
  "selections": [
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "small",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 500
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 375
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:500,version:\"wide\",width:375)"
        },
        {
          "alias": "medium",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 800
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 600
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/)
          ],
          "storageKey": "cropped(height:800,version:\"wide\",width:600)"
        },
        {
          "alias": "large",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1200
            },
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
          "selections": [
            (v2/*: any*/)
          ],
          "storageKey": "cropped(height:1200,version:\"wide\",width:900)"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeaderIcon_fair"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '0a84a5f72f842bca3df95a50ef9fd2c4';
export default node;
