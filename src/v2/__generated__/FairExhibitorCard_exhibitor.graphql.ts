/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorCard_exhibitor = {
    readonly profileID: string | null;
    readonly partner: {
        readonly name: string | null;
        readonly internalID: string;
        readonly slug: string;
        readonly cities: ReadonlyArray<string | null> | null;
        readonly profile: {
            readonly icon: {
                readonly cropped: {
                    readonly src: string;
                    readonly srcSet: string;
                } | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
        } | null;
    } | null;
    readonly " $refType": "FairExhibitorCard_exhibitor";
};
export type FairExhibitorCard_exhibitor$data = FairExhibitorCard_exhibitor;
export type FairExhibitorCard_exhibitor$key = {
    readonly " $data"?: FairExhibitorCard_exhibitor$data;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_exhibitor">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorCard_exhibitor",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
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
          "name": "cities",
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
                      "value": 50
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 50
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
                  "storageKey": "cropped(height:50,width:50)"
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FollowProfileButton_profile"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairExhibitor"
};
(node as any).hash = 'da98359cf26a7797eba752408b3f3f62';
export default node;
