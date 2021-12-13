/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerHeaderIcon_fairOrganizer = {
    readonly name: string | null;
    readonly profile: {
        readonly icon: {
            readonly desktop: {
                readonly src: string;
                readonly srcSet: string;
                readonly size: number;
            } | null;
            readonly mobile: {
                readonly src: string;
                readonly srcSet: string;
                readonly size: number;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "FairOrganizerHeaderIcon_fairOrganizer";
};
export type FairOrganizerHeaderIcon_fairOrganizer$data = FairOrganizerHeaderIcon_fairOrganizer;
export type FairOrganizerHeaderIcon_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerHeaderIcon_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerHeaderIcon_fairOrganizer">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
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
  },
  {
    "alias": "size",
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerHeaderIcon_fairOrganizer",
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": "desktop",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 80
                },
                (v0/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 80
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": "cropped(height:80,version:\"square140\",width:80)"
            },
            {
              "alias": "mobile",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 60
                },
                (v0/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 60
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": "cropped(height:60,version:\"square140\",width:60)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairOrganizer"
};
})();
(node as any).hash = 'dddc2ee309b49029c8c9d10e9c0d3843';
export default node;
