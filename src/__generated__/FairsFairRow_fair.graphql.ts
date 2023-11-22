/**
 * @generated SignedSource<<97933fecad2ae40c30bd8e8160de3970>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairsFairRow_fair$data = {
  readonly exhibitionPeriod: string | null | undefined;
  readonly href: string | null | undefined;
  readonly isoStartAt: string | null | undefined;
  readonly name: string | null | undefined;
  readonly organizer: {
    readonly profile: {
      readonly href: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly profile: {
    readonly icon: {
      readonly resized: {
        readonly height: number | null | undefined;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FairsFairRow_fair";
};
export type FairsFairRow_fair$key = {
  readonly " $data"?: FairsFairRow_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairsFairRow_fair">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairsFairRow_fair",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "isoStartAt",
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "exhibitionPeriod",
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
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 80
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "square140"
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 80
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
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
                },
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
              "storageKey": "resized(height:80,version:\"square140\",width:80)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FairOrganizer",
      "kind": "LinkedField",
      "name": "organizer",
      "plural": false,
      "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
})();

(node as any).hash = "18bcad7870e32664847bf5de2aa4b757";

export default node;
