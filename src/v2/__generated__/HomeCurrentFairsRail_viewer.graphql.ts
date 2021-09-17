/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeCurrentFairsRail_viewer = {
    readonly fairs: ReadonlyArray<{
        readonly internalID: string;
        readonly bannerSize: string | null;
        readonly isPublished: boolean | null;
        readonly profile: {
            readonly isPublished: boolean | null;
        } | null;
        readonly href: string | null;
        readonly name: string | null;
        readonly startAt: string | null;
        readonly endAt: string | null;
        readonly image: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
                readonly width: number;
                readonly height: number;
            } | null;
        } | null;
    } | null> | null;
    readonly " $refType": "HomeCurrentFairsRail_viewer";
};
export type HomeCurrentFairsRail_viewer$data = HomeCurrentFairsRail_viewer;
export type HomeCurrentFairsRail_viewer$key = {
    readonly " $data"?: HomeCurrentFairsRail_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeCurrentFairsRail_viewer">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublished",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeCurrentFairsRail_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "hasFullFeature",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "hasListing",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 25
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "RUNNING"
        }
      ],
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fairs",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bannerSize",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Profile",
          "kind": "LinkedField",
          "name": "profile",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM Do"
            }
          ],
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": "startAt(format:\"MMM Do\")"
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM Do YYYY"
            }
          ],
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": "endAt(format:\"MMM Do YYYY\")"
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
                  "name": "height",
                  "value": 315
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 440
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": [
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
                },
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
              "storageKey": "cropped(height:315,width:440)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"RUNNING\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();
(node as any).hash = '3286a8c32ccbbdf063ae43b571a69faa';
export default node;
