/**
 * @generated SignedSource<<00e50854631e6d1878ca144cc96af42b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeCurrentFairs_viewer$data = {
  readonly fairs: ReadonlyArray<{
    readonly bannerSize: string | null | undefined;
    readonly endAt: string | null | undefined;
    readonly exhibitionPeriod: string | null | undefined;
    readonly href: string | null | undefined;
    readonly image: {
      readonly cropped: {
        readonly height: number;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly isPublished: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly profile: {
      readonly isPublished: boolean | null | undefined;
    } | null | undefined;
    readonly slug: string;
    readonly startAt: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "HomeCurrentFairs_viewer";
};
export type HomeCurrentFairs_viewer$key = {
  readonly " $data"?: HomeCurrentFairs_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeCurrentFairs_viewer">;
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
  "name": "HomeCurrentFairs_viewer",
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
          "name": "slug",
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
          "kind": "ScalarField",
          "name": "exhibitionPeriod",
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
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 450
                },
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
              "storageKey": "cropped(height:450,width:600)"
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

(node as any).hash = "772c24fda5e4c96fef072e0a03e6f8f4";

export default node;
