/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntityHeaderFairOrganizer_fairOrganizer = {
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly fairsConnection: {
        readonly totalCount: number | null;
    } | null;
    readonly profile: {
        readonly internalID: string;
        readonly href: string | null;
        readonly initials: string | null;
        readonly avatar: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "EntityHeaderFairOrganizer_fairOrganizer";
};
export type EntityHeaderFairOrganizer_fairOrganizer$data = EntityHeaderFairOrganizer_fairOrganizer;
export type EntityHeaderFairOrganizer_fairOrganizer$key = {
    readonly " $data"?: EntityHeaderFairOrganizer_fairOrganizer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EntityHeaderFairOrganizer_fairOrganizer">;
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
  "name": "EntityHeaderFairOrganizer_fairOrganizer",
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FairConnection",
      "kind": "LinkedField",
      "name": "fairsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
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
        (v0/*: any*/),
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
          "name": "initials",
          "storageKey": null
        },
        {
          "alias": "avatar",
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
                  "value": 45
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 45
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
                }
              ],
              "storageKey": "cropped(height:45,width:45)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};
})();
(node as any).hash = '1b091ee93b9da81ade80d2d368113bc3';
export default node;
